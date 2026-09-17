"""Qdrant: a purpose-built vector database (Rust, Apache-2.0).

Qdrant is a separate server process with its own HTTP/gRPC API. The three ideas
to absorb here:

1. A *collection* owns one vector space (fixed dimension + distance metric).
2. You bring your own embeddings and attach them to *points* with a JSON
   *payload* (title, topic, body). Payload is metadata you can filter on.
3. An *HNSW index* skips the linear scan: it answers approximate nearest
   neighbors in O(log n)-ish time instead of the O(n) of 01_bruteforce.py.
   That is why "recall" is allowed to be slightly below 100%.

Requires the qdrant service from docker-compose.yml:
    docker compose up -d
    uv run python 02_qdrant.py
"""

from __future__ import annotations

import time

import numpy as np
from qdrant_client import QdrantClient
from qdrant_client.http import models as qm

from embed import DOCS, EMBEDDINGS, QUERIES, embed

COLLECTION = "documents"
EMBEDDING_DIM = EMBEDDINGS.shape[1]
K = 10
QDRANT_URL = "http://localhost:6333"

client = QdrantClient(url=QDRANT_URL)


def wait_until_ready(timeout_s: float = 60.0) -> None:
    """Qdrant may still be booting when this script runs; retry until it answers."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            client.get_collections()  # cheap; raises until the API is up
            return
        except Exception:
            time.sleep(0.5)
    raise SystemExit("qdrant did not become ready in time; is `docker compose up -d` running?")


def create_collection() -> None:
    """Recreate the collection from scratch so this script is idempotent."""
    client.delete_collection(COLLECTION)
    client.create_collection(
        collection_name=COLLECTION,
        vectors_config=qm.VectorParams(
            size=EMBEDDING_DIM, distance=qm.Distance.COSINE
        ),
        hnsw_config=qm.HnswConfigDiff(m=16, ef_construct=100),
    )
    # Tell Qdrant that `topic` is a keyword so filters on it are fast.
    client.create_payload_index(
        collection_name=COLLECTION,
        field_name="topic",
        field_schema=qm.PayloadSchemaType.KEYWORD,
    )


def ingest() -> None:
    client.upsert(
        collection_name=COLLECTION,
        points=[
            qm.PointStruct(
                id=i,
                vector=EMBEDDINGS[i].tolist(),
                payload={
                    "doc_id": DOCS[i].doc_id,
                    "title": DOCS[i].title,
                    "topic": DOCS[i].topic,
                    "body": DOCS[i].body,
                },
            )
            for i in range(len(DOCS))
        ],
    )


def search(
    query_text: str, k: int = K, topic: str | None = None
) -> list[dict]:
    """Similarity search, optionally restricted to a single topic (filter)."""
    must = None
    if topic is not None:
        must = [qm.FieldCondition(key="topic", match=qm.MatchValue(value=topic))]
    query_filter = None if must is None else qm.Filter(must=must)
    hits = client.query_points(
        collection_name=COLLECTION,
        query=embed(query_text).tolist(),
        query_filter=query_filter,
        limit=k,
    ).points
    return [
        {
            "doc_id": h.payload["doc_id"],
            "title": h.payload["title"],
            "topic": h.payload["topic"],
            "score": h.score,
        }
        for h in hits
    ]


def recall_at_k(results: list[dict], expected_topic: str) -> float:
    hits = sum(1 for r in results[:K] if r["topic"] == expected_topic)
    return hits / K


def main() -> None:
    wait_until_ready()
    create_collection()
    ingest()
    print(f"qdrant: collection '{COLLECTION}', {len(DOCS)} points, dim={EMBEDDING_DIM}\n")

    for question, topic in QUERIES:
        t0 = time.perf_counter()
        results = search(question)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        recall = recall_at_k(results, topic)
        print(f"q: {question!r}   [about: {topic}, {elapsed_ms:.2f} ms, recall@{K}={recall:.0%}]")
        for r in results[:5]:
            print(f"   {r['score']:.4f}  {r['doc_id']}  {r['title']}")
        print()

    print("-- filtered example: 'telescope galaxy star' restricted to topic=cooking --")
    shown = search("telescope galaxy star orbit", topic="cooking")
    for r in shown[:5]:
        print(f"   {r['score']:.4f}  {r['doc_id']}  {r['title']}  (topic={r['topic']})")


if __name__ == "__main__":
    main()