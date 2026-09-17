"""Brute-force similarity search = the ground truth.

This script ignores databases entirely. It holds all EMBEDDINGS in memory as a
matrix and scores every document against every query with a single matrix
multiplication, which is exactly an exhaustive (FLAT) similarity search.

For each query it saves the exact top-k result list to out/ground_truth.json.
Every database script later runs the same queries and we measure "recall@k":
what fraction of the database's top-k matches appear in this exact list.

Run first, before any of the database scripts:
    uv run python 01_bruteforce.py
"""

from __future__ import annotations

import json
import os
import time

import numpy as np

from embed import DOCS, EMBEDDINGS, QUERIES, embed

K = 10


def brute_force(query_text: str, k: int = K) -> list[dict]:
    """Exact top-k: score = cosine similarity (matrix is normalized)."""
    q = embed(query_text)
    scores = EMBEDDINGS @ q  # (num_docs,) dense cosine scores
    order = np.argsort(scores)[::-1][:k]
    return [
        {
            "doc_id": DOCS[i].doc_id,
            "title": DOCS[i].title,
            "topic": DOCS[i].topic,
            "score": round(float(scores[i]), 6),
        }
        for i in order
    ]


def recall_at_k(results: list[dict], expected_topic: str, k: int = K) -> float:
    """Fraction of the top-k whose topic matches the query's intent."""
    hits = sum(1 for r in results[:k] if r["topic"] == expected_topic)
    return hits / k


def main() -> None:
    os.makedirs("out", exist_ok=True)
    ground_truth = []
    print(f"Exact search on {len(DOCS)} docs x {len(QUERIES)} queries (k={K})\n")
    for question, topic in QUERIES:
        t0 = time.perf_counter()
        results = brute_force(question)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        ground_truth.append({"query": question, "topic": topic, "top_k": results})
        recall = recall_at_k(results, topic)
        print(f"q: {question!r}   [about: {topic}, {elapsed_ms:.2f} ms, recall@{K}={recall:.0%}]")
        for r in results[:5]:
            print(f"   {r['score']:.4f}  {r['doc_id']}  {r['title']}")
        print()

    with open("out/ground_truth.json", "w") as fh:
        json.dump(ground_truth, fh, indent=2)
    print("saved -> out/ground_truth.json (the exact answers every DB must match)")


if __name__ == "__main__":
    main()