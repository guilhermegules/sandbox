# Vector Databases

Learn open-source vector databases the same way you learned the harness loop:
with runnable Python and three real engines running in Docker, compared against
an exact brute-force baseline.

We do not download an embedding model. `embed.py` produces deterministic local
"embeddings" with a text-hashing trick -- reproducible, no network, no API
keys -- exactly like `model.py` simulates the LLM in the sibling lesson. Every
database indexes the *same* vectors, so differences in results come from the
databases, not from the vectors.

## Why these three

| Engine | License | Shape | Philosophy |
|---|---|---|---|
| **Qdrant** | Apache 2.0 | Rust, dedicated server | Purpose-built vector DB: collections, points, payload filtering, low latency |
| **pgvector** | PostgreSQL license | Extension on Postgres | Vectors as a `vector(n)` column in the DB you already run, queried with plain SQL |
| **Weaviate** | BSD-3-Clause | Go, dedicated server | AI-native: classes/objects and **hybrid search** (BM25 keyword + vector fused) |

Milvus (billion-scale, Kubernetes-native) is the fourth philosophy -- the one
you reach for when you outgrow everything else. It is intentionally left out:
it needs a cluster, not a lesson.

## Quick start

Prerequisites: Docker (with compose) and [uv](https://docs.astral.sh/uv/).

```bash
docker compose up -d      # start Qdrant, PostgreSQL+pgvector, Weaviate
uv sync                   # install the Python clients into .venv

uv run python 01_bruteforce.py   # exact answers = the ground truth
uv run python 02_qdrant.py
uv run python 03_pgvector.py
uv run python 04_weaviate.py
uv run python 05_compare.py       # recall + latency, side by side
```

Stop the servers with `docker compose down` (data persists) or
`docker compose down -v` (wipe everything).

## What each script teaches

| File | Concept |
|---|---|
| `embed.py` | Corpus (500 docs, 8 topics) + deterministic hashing-trick embeddings into 128-dim unit vectors |
| `01_bruteforce.py` | Exact/FLAT search: score every vector against the query. The ground truth, saved to `out/ground_truth.json` |
| `02_qdrant.py` | Collections, points with JSON payloads, payload indexes, HNSW, filtered search |
| `03_pgvector.py` | `vector(128)` column, `<=>` cosine operator, HNSW index in SQL, filters as `WHERE` |
| `04_weaviate.py` | Classes/objects, `near_vector` search, and **hybrid** search (BM25 + vector) |
| `05_compare.py` | Same queries run everywhere: p50 latency, exact recall@10, topic accuracy@10 |

Every database script is idempotent: it drops/recreates its collection, class,
or table and re-ingests all 500 documents, so run them as many times as you
like.

## Reading the comparison table

```
engine         p50 (ms)  exact recall@10  topic acc@10
brute-force       0.10           100%           100%
qdrant            ...            ~98%          ~100%
pgvector          ...
weaviate          ...
```

- **exact recall@10** -- the fraction of the brute-force top-10 a database
  returned. Below 100% is the cost of the ANN index (HNSW): a tiny accuracy
  trade for logarithmic-time search at scale.
- **topic accuracy@10** -- the fraction of the top-10 whose topic matches the
  query's intent. Always high here because the corpus is synthetic; real data
  makes this the metric that decides which engine you bet on.
- **p50 (ms)** -- wall-clock per query on a 500-doc toy set. It is not the
  point; the *recall* trade-offs are. At millions of vectors, brute force is
  unusable and this column becomes the whole conversation.

## Concepts in one paragraph

Embeddings map meaning to a vector where similar things are close (cosine ~ 1).
Searching is then "nearest neighbors to a query vector." A linear scan is exact
but O(n); ANN indexes like HNSW trade a little accuracy for navigation that
skips most of the data. Qdrant heroics the index, pgvector shelves it next to
your relational data where SQL can `WHERE topic = 'x'` before/after the vector
hop, and Weaviate fuses BM25 keyword scores with vector scores so misspelled or
out-of-vocabulary tokens still find the right documents.

## Project layout

```
vector-databases/
├── docker-compose.yml    # qdrant + pgvector (postgres) + weaviate services
├── pyproject.toml        # uv-managed deps: numpy, qdrant-client, psycopg, pgvector, weaviate-client
├── embed.py              # corpus + deterministic embeddings
├── prompt.md             # the instructor lesson guide (matches sibling folders)
├── quiz.md               # key terms + pre/post-test
├── 01_bruteforce.py
├── 02_qdrant.py
├── 03_pgvector.py
├── 04_weaviate.py
├── 05_compare.py
└── out/                  # ground truth + comparison artifacts (git-ignored)
```

## Further reading

- Qdrant: <https://qdrant.tech/documentation/>
- pgvector: <https://github.com/pgvector/pgvector>
- Weaviate: <https://weaviate.io/developers/weaviate>
- ANN index concepts: <https://github.com/zilliztech/VectorDBBench> and Faiss docs