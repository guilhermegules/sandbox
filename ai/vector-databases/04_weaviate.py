"""Weaviate: an AI-native vector database with hybrid search.

Weaviate (Go, BSD-3) is opinionated about how you talk to it: there are no
SQL or raw REST mutation calls -- you define a *class* (schema), insert
*objects*, and query them with the client SDK (GraphQL under the hood).

What is different from Qdrant/pgvector, in one word: HYBRID. With
`query_hybrid` you give Weaviate *both* the query text and the query vector,
and it fuses BM25 keyword scores with dense-vector scores (RRF fusion). That
is how production search systems handle misspellings, rare tokens, IDs, and
jargon that embeddings know nothing about.

The ideas to absorb here:
1. A *class* is a schema: named properties (title/topic/body) + the vector
   space you bring yourself (vectorizer none).
2. Objects are inserted with data + explicit vector.
3. `near_vector` = pure embedding search; `hybrid` = BM25 + vector.
4. Filters are typed (Filter.by_property('topic').equal(...)).

Requires the weaviate service from docker-compose.yml:
    docker compose up -d
    uv run python 04_weaviate.py
"""

from __future__ import annotations

import atexit
import time
import uuid
import warnings

warnings.filterwarnings("ignore", message="The httpx module is deprecated")

from weaviate import connect_to_local
from weaviate.classes.config import Configure, DataType, Property
from weaviate.classes.query import Filter, MetadataQuery
from weaviate.exceptions import WeaviateClosedClientError, WeaviateConnectionError

from embed import DOCS, EMBEDDINGS, QUERIES, embed

CLASS_NAME = "Document"
EMBEDDING_DIM = EMBEDDINGS.shape[1]
K = 10


def wait_until_ready(timeout_s: float = 120.0) -> None:
    """Weaviate can take a while on first boot (schema init)."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            if client.is_ready():
                return
        except (WeaviateClosedClientError, WeaviateConnectionError):
            pass
        time.sleep(1.0)
    raise SystemExit("weaviate did not become ready in time; is `docker compose up -d` running?")


client = connect_to_local()
atexit.register(client.close)  # release the connection even when imported by 05_compare.py


def reset_class() -> None:
    client.collections.delete(CLASS_NAME)
    client.collections.create(
        CLASS_NAME,
        # We supply vectors ourselves; no built-in vectorizer.
        vector_config=Configure.Vectors.self_provided(),
        properties=[
            Property(name="title", data_type=DataType.TEXT),
            Property(name="topic", data_type=DataType.TEXT),
            Property(name="body", data_type=DataType.TEXT),
        ],
    )


def ingest() -> None:
    collection = client.collections.get(CLASS_NAME)
    with collection.batch.fixed_size(100) as batch:
        for i, doc in enumerate(DOCS):
            batch.add_object(
                properties={"title": doc.title, "topic": doc.topic, "body": doc.body},
                vector=EMBEDDINGS[i].tolist(),
                uuid=uuid.uuid5(uuid.NAMESPACE_URL, f"vector-db://{doc.doc_id}"),
            )


def _rows(resp) -> list[dict]:
    return [
        {
            "doc_id": o.properties.get("doc_id") or _doc_id_from_uuid(o.uuid),
            "title": o.properties["title"],
            "topic": o.properties["topic"],
            "score": getattr(getattr(o, "metadata", None), "distance", None),
        }
        for o in resp.objects
    ]


def _doc_id_from_uuid(obj_uuid) -> str:
    # Deterministic reverse mapping: doc_id lives in our uuid namespace.
    for doc in DOCS:
        if uuid.uuid5(uuid.NAMESPACE_URL, f"vector-db://{doc.doc_id}") == obj_uuid:
            return doc.doc_id
    return str(obj_uuid)


def search(
    query_text: str,
    k: int = K,
    topic: str | None = None,
    hybrid: bool = False,
) -> list[dict]:
    """Pure `near_vector` search, or hybrid (BM25 + vector)."""
    collection = client.collections.get(CLASS_NAME)
    opts = {"limit": k, "return_metadata": MetadataQuery(distance=True)}
    if topic is not None:
        opts["filters"] = Filter.by_property("topic").equal(topic)
    if hybrid:
        opts["query"] = query_text
        opts["vector"] = embed(query_text).tolist()
        resp = collection.query.hybrid(**opts)
    else:
        opts["near_vector"] = embed(query_text).tolist()
        resp = collection.query.near_vector(**opts)
    return _rows(resp)


def recall_at_k(results: list[dict], expected_topic: str) -> float:
    hits = sum(1 for r in results[:K] if r["topic"] == expected_topic)
    return hits / K


def main() -> None:
    wait_until_ready()
    reset_class()
    ingest()
    print(f"weaviate: class '{CLASS_NAME}', {len(DOCS)} objects, dim={EMBEDDING_DIM}\n")

    for question, topic in QUERIES:
        t0 = time.perf_counter()
        results = search(question)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        recall = recall_at_k(results, topic)
        print(f"q: {question!r}   [about: {topic}, {elapsed_ms:.2f} ms, recall@{K}={recall:.0%}]")
        for r in results[:5]:
            print(f"   {r['score']}  {r['doc_id']}  {r['title']}")
        print()

    print("-- hybrid example (BM25 + vector): keyword-ish query --")
    hybrid_query = "banana orange mango smoothie recipe"
    results = search(hybrid_query, hybrid=True)
    for r in results[:5]:
        print(f"   {r['title']:>22}  topic={r['topic']}")

    print("-- filtered example: 'telescope galaxy star' restricted to topic=cooking --")
    for r in search("telescope galaxy star orbit", topic="cooking")[:5]:
        print(f"   {r['title']:>22}  topic={r['topic']}")


if __name__ == "__main__":
    main()