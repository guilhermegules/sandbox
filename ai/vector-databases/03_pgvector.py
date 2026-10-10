"""pgvector: vector search inside the PostgreSQL you already run.

The other two projects in this folder are dedicated servers. pgvector is the
opposite philosophy: a free extension that adds a `vector` type and ANN
indexes (IVFFlat, HNSW) to Postgres. You keep everything -- documents,
metadata, vectors, transactions -- in one relational database and query it
with plain SQL.

The ideas to absorb here:
1. A `vector(128)` column stores the embeddings next to the row data.
2. Distance operators: `<=>` is cosine distance, `<->` is L2, `<#>` is inner
   product.
3. An HNSW index makes the ORDER BY ... LIMIT lookup approximate instead of a
   full table scan.
4. You can combine vector search with normal SQL (WHERE, JOIN, transactions) --
   this is the big draw when Postgres is already in your stack.

Requires the postgres service from docker-compose.yml:
    docker compose up -d
    uv run python 03_pgvector.py
"""

from __future__ import annotations

import time

import psycopg
from pgvector.psycopg import register_vector

from embed import DOCS, EMBEDDINGS, QUERIES, embed

TABLE = "documents"
EMBEDDING_DIM = EMBEDDINGS.shape[1]
K = 10
DSN = "postgresql://vector:vector@localhost:5432/vectordb"


def wait_until_ready(timeout_s: float = 60.0) -> None:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            with psycopg.connect(DSN) as conn:
                conn.execute("SELECT 1")
                return
        except psycopg.OperationalError:
            time.sleep(0.5)
    raise SystemExit("postgres did not become ready in time; is `docker compose up -d` running?")


def reset_table() -> None:
    """Drop and recreate so this script is idempotent."""
    with psycopg.connect(DSN) as conn:
        with conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector")
        conn.commit()
        register_vector(conn)  # now the `vector` type exists; teach psycopg the OID
        with conn.cursor() as cur:
            cur.execute(f"DROP TABLE IF EXISTS {TABLE}")
            cur.execute(
                f"""
                CREATE TABLE {TABLE} (
                    id          serial PRIMARY KEY,
                    doc_id      text UNIQUE NOT NULL,
                    title       text NOT NULL,
                    topic       text NOT NULL,
                    body        text NOT NULL,
                    embedding   vector({EMBEDDING_DIM}) NOT NULL
                )
                """
            )
            # HNSW index over cosine distance: approximate NN, like Qdrant.
            cur.execute(
                f"CREATE INDEX {TABLE}_hnsw ON {TABLE} USING hnsw (embedding vector_cosine_ops)"
            )
        conn.commit()


def ingest() -> None:
    with psycopg.connect(DSN) as conn:
        register_vector(conn)
        with conn.cursor() as cur:
            rows = [
                (d.doc_id, d.title, d.topic, d.body, EMBEDDINGS[i])
                for i, d in enumerate(DOCS)
            ]
            cur.executemany(
                f"INSERT INTO {TABLE} (doc_id, title, topic, body, embedding) "
                f"VALUES (%s, %s, %s, %s, %s)",
                rows,
            )
        conn.commit()


def search(query_text: str, k: int = K, topic: str | None = None) -> list[dict]:
    """Vector search as a SQL query. Cosine similarity = 1 - cosine distance."""
    q = embed(query_text)
    with psycopg.connect(DSN) as conn:
        register_vector(conn)
        sql = (
            f"SELECT doc_id, title, topic, 1 - (embedding <=> %s) AS score "
            f"FROM {TABLE}"
        )
        params: list = [q]
        if topic is not None:
            sql += " WHERE topic = %s"
            params.append(topic)
        sql += " ORDER BY embedding <=> %s LIMIT %s"
        params += [q, k]
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return [
                {"doc_id": r[0], "title": r[1], "topic": r[2], "score": r[3]}
                for r in cur.fetchall()
            ]


def recall_at_k(results: list[dict], expected_topic: str) -> float:
    hits = sum(1 for r in results[:K] if r["topic"] == expected_topic)
    return hits / K


def main() -> None:
    wait_until_ready()
    reset_table()
    ingest()
    print(f"pgvector: table '{TABLE}', {len(DOCS)} rows, vector({EMBEDDING_DIM}) + HNSW index\n")

    for question, topic in QUERIES:
        t0 = time.perf_counter()
        results = search(question)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        recall = recall_at_k(results, topic)
        print(f"q: {question!r}   [about: {topic}, {elapsed_ms:.2f} ms, recall@{K}={recall:.0%}]")
        for r in results[:5]:
            print(f"   {r['score']:.4f}  {r['doc_id']}  {r['title']}")
        print()

    print("-- SQL in action: count of sports docs, and vector search JOINed to filters --")
    with psycopg.connect(DSN) as conn:
        count = conn.execute("SELECT topic, COUNT(*) FROM documents GROUP BY topic ORDER BY COUNT(*) DESC").fetchall()
        for topic, n in count:
            print(f"   {topic:<12} {n}")
    print("-- filtered example: 'telescope galaxy star orbit' WHERE topic='cooking' --")
    for r in search("telescope galaxy star orbit", topic="cooking")[:5]:
        print(f"   {r['score']:.4f}  {r['doc_id']}  {r['title']}  (topic={r['topic']})")


if __name__ == "__main__":
    main()