"""Side-by-side comparison of the three vector databases.

Runs the identical queries against Qdrant, pgvector, and Weaviate (plus the
brute-force baseline from 01_bruteforce.py) and prints one table:

    engine         p50    exact recall@10   topic acc@10
    brute-force    ...    --- (it IS exact) ...

* "exact recall@10" = fraction of the DB's top-10 that also appear in the
  brute-force top-10 (out/ground_truth.json). 1.00 means the ANN index agreed
  with the linear scan; below 1.00 is the approximation cost of HNSW.
* "topic acc@10"   = fraction of the top-10 whose topic matches the query.
  This is the "does it actually understand the question" metric we use in the
  lessons.

Needs out/ground_truth.json (run 01_bruteforce.py first) and all services up:
    docker compose up -d
    uv run python 01_bruteforce.py
    uv run python 05_compare.py
"""

from __future__ import annotations

import importlib.util
import json
import os
import statistics
import time

import numpy as np

from embed import EMBEDDINGS, QUERIES, embed

K = 10
REPEAT = 10


def load_module(name: str, path: str):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    return mod


PWD = os.path.dirname(os.path.abspath(__file__))
ENGINES = {
    "qdrant": load_module("qdrant_demo", os.path.join(PWD, "02_qdrant.py")),
    "pgvector": load_module("pgvector_demo", os.path.join(PWD, "03_pgvector.py")),
    "weaviate": load_module("weaviate_demo", os.path.join(PWD, "04_weaviate.py")),
}

with open(os.path.join(PWD, "out/ground_truth.json")) as fh:
    GROUND_TRUTH = json.load(fh)
GT_BY_QUERY = {entry["query"]: {r["doc_id"] for r in entry["top_k"]} for entry in GROUND_TRUTH}


def exact_recall(results: list[dict], query: str) -> float:
    got = {r["doc_id"] for r in results[:K]}
    return len(got & GT_BY_QUERY[query]) / K


def topic_accuracy(results: list[dict], expected_topic: str) -> float:
    return sum(1 for r in results[:K] if r["topic"] == expected_topic) / K


def run_and_measure(search_fn, query: str, topic: str) -> tuple[list[dict], list[float]]:
    latencies: list[float] = []
    results: list[dict] = []
    for _ in range(REPEAT):
        t0 = time.perf_counter()
        results = search_fn(query, k=K)
        latencies.append((time.perf_counter() - t0) * 1000)
    return results, latencies


def main() -> None:
    if not os.path.exists(os.path.join(PWD, "out/ground_truth.json")):
        raise SystemExit("out/ground_truth.json missing -- run `uv run python 01_bruteforce.py` first")

    rows: list[dict] = []

    # Brute force baseline: exact answers, pure numpy.
    qvecs = np.stack([embed(q) for q, _ in QUERIES])
    exact_lat = []
    for q in qvecs:
        t0 = time.perf_counter()
        top = EMBEDDINGS @ q
        _ = np.argsort(top)[::-1][:K]
        exact_lat.append((time.perf_counter() - t0) * 1000)
    rows.append({"engine": "brute-force", "p50": statistics.median(exact_lat),
                 "exact@10": 1.0, "topic@10": 1.0})

    for name, mod in ENGINES.items():
        try:
            mod.wait_until_ready()
        except SystemExit as exc:
            print(f"[skip] {name}: {exc}")
            continue
        exact_scores, topic_scores, latencies = [], [], []
        for query, topic in QUERIES:
            results, lats = run_and_measure(mod.search, query, topic)
            exact_scores.append(exact_recall(results, query))
            topic_scores.append(topic_accuracy(results, topic))
            latencies.extend(lats)
        rows.append({
            "engine": name,
            "p50": statistics.median(latencies),
            "exact@10": sum(exact_scores) / len(exact_scores),
            "topic@10": sum(topic_scores) / len(topic_scores),
        })

    header = f"{'engine':<14}{'p50 (ms)':>10}{'exact recall@10':>16}{'topic acc@10':>14}"
    print(header)
    print("-" * len(header))
    for r in rows:
        print(f"{r['engine']:<14}{r['p50']:>10.2f}{r['exact@10']:>16.0%}{r['topic@10']:>14.0%}")

    print("\nHow to read it:")
    print("- exact recall@10 < 100% is the ANN approximation (HNSW) trading"
          " a tiny accuracy loss for speed at scale.")
    print("- topic acc@10 teases apart 'did it retrieve the right vectors' from"
          " 'did it retrieve vectors that mean the right thing'.")
    print("- p50 is wall-clock per query in this 500-doc toy dataset -- the real"
          " gap widens at millions of vectors.")


if __name__ == "__main__":
    main()