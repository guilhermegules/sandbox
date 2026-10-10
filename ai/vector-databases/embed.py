"""Shared corpus + deterministic embeddings.

This project does not download an embedding model. Real models need network
access and are heavy; the existing sandbox lessons simulate the model instead.
Here we do the same: `embed()` turns text into a fixed-size vector with a
hashing trick -- term hashes land in a bucket with a +1/-1 sign. It is a
crude "semantic" space, but it is deterministic, so every database indexes the
exact same vectors, and the brute-force baseline in 01_bruteforce.py stays the
single source of truth for recall.

Module-level constants (DOCS, EMBEDDING_DIM) are computed once at import time,
so every script sees identical documents and vectors.
"""

from __future__ import annotations

import hashlib
import json
import re
import random
from dataclasses import dataclass

import numpy as np

EMBEDDING_DIM = 128
NUM_DOCS = 500
SEED = 42

# Eight topics, each with vocabulary the generator uses to build documents.
TOPIC_WORDS = {
    "fruits": ["apple", "banana", "mango", "orange", "grape", "peach", "berry", "melon"],
    "vehicles": ["car", "truck", "bike", "engine", "battery", "fuel", "electric", "wheel"],
    "programming": ["code", "python", "function", "debug", "compile", "variable", "loop", "library"],
    "space": ["planet", "star", "galaxy", "comet", "orbit", "telescope", "asteroid", "nebula"],
    "cooking": ["recipe", "pan", "oven", "bake", "sauce", "spice", "simmer", "chef"],
    "sports": ["score", "team", "match", "coach", "league", "player", "stadium", "training"],
    "music": ["guitar", "rhythm", "melody", "album", "band", "lyrics", "concert", "beat"],
    "ocean": ["coral", "reef", "tide", "current", "wave", "shark", "turtle", "kelp"],
}

# Generic words sprinkled into every document so embedding is not only keywords.
FILLER = ["sample", "note", "record", "detail", "study", "report", "measure", "group"]

# Queries used across all scripts. The second field is the topic the query is
# about; it is the key we use to compute recall against
# (does the topic of the result match the topic the query is about?).
QUERIES = [
    ("electric car battery engine fuel wheel", "vehicles"),
    ("bake a chocolate cake recipe in the oven", "cooking"),
    ("python function variable loop debugging", "programming"),
    ("telescope galaxy star orbit planet", "space"),
    ("coral reef shark turtle ocean wave", "ocean"),
]

_TOKEN_SPLIT = re.compile(r"[a-z0-9']+")


@dataclass(frozen=True)
class Doc:
    """A single document with a stable string id and its metadata."""

    doc_id: str
    title: str
    topic: str
    body: str


def _make_corpus() -> list[Doc]:
    """Generate NUM_DOCS deterministic documents spread across the topics."""
    rng = random.Random(SEED)
    topics = list(TOPIC_WORDS)
    docs: list[Doc] = []
    for i in range(NUM_DOCS):
        topic = topics[i % len(topics)]
        vocab = TOPIC_WORDS[topic]
        words = list(vocab) + list(FILLER)
        body_words = [rng.choice(words) for _ in range(rng.randint(14, 22))]
        body = " ".join(body_words)
        docs.append(
            Doc(
                doc_id=f"doc-{i:04d}",
                title=f"{topic} item {i:03d}",
                topic=topic,
                body=body,
            )
        )
    return docs


def embed(text: str, dim: int = EMBEDDING_DIM) -> np.ndarray:
    """Map arbitrary text to a unit vector of length `dim`.

    Hashing trick: for each token, hash its bytes, pick a bucket and a sign,
    and accumulate. The vector count is lightweight (term-frequency-ish) and
    then normalized to length 1 so cosine similarity works directly.
    """
    vec = np.zeros(dim, dtype=np.float32)
    for token in _TOKEN_SPLIT.findall(text.lower()):
        digest = hashlib.blake2b(token.encode("utf-8"), digest_size=8).digest()
        bucket = int.from_bytes(digest[:8], "big") % dim
        sign = 1.0 if digest[0] & 1 else -1.0
        vec[bucket] += sign
    norm = float(np.linalg.norm(vec))
    return vec / norm if norm else vec


# Precomputed once per process so all scripts agree on the data.
DOCS = _make_corpus()
EMBEDDINGS = np.stack([embed(doc.body) for doc in DOCS])  # (NUM_DOCS, dim)
BY_ID = {doc.doc_id: doc for doc in DOCS}


def embedding_for(doc_id: str) -> np.ndarray:
    """Raw embedding for a doc id (or zero vector if unknown)."""
    idx = next(i for i, d in enumerate(DOCS) if d.doc_id == doc_id)
    return EMBEDDINGS[idx]


def save_docs_json(path="out/documents.json"):
    """Serialize the corpus (used when importing into databases)."""
    import os

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as fh:
        json.dump(
            [
                {"doc_id": d.doc_id, "title": d.title, "topic": d.topic, "body": d.body}
                for d in DOCS
            ],
            fh,
        )


def topic_of(doc_id: str) -> str:
    return BY_ID[doc_id].topic


if __name__ == "__main__":
    print(f"corpus: {len(DOCS)} docs, {len(TOPIC_WORDS)} topics, dim={EMBEDDING_DIM}")
    for topic, words in TOPIC_WORDS.items():
        print(f"  {topic:<12} {len([d for d in DOCS if d.topic == topic]):>3} docs  {words[:3]}...")
    a = embed("electric car battery fuel wheel")
    b = embed("bake oven recipe cake")
    print(f"doc 1  -> {DOCS[0].title}")
    print(f"embedding dim={a.size}, |v|={np.linalg.norm(a):.3f}")
    print(f"cos(vehicle-text, cooking-text) = {float(a @ b):.3f}   (different topics, near 0)")
    print(f"cos(vehicle-text, vehicle-text) = {float(a @ a):.3f}   (same text, identical)")