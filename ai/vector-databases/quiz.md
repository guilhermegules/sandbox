# Vector Databases Quiz

## Key Terms

| Term | What people say | What it actually means |
|------|----------------|----------------------|
| Embedding | "The meaning of the text as numbers" | A fixed-length vector where similar things land close together (cosine ~ 1) |
| Cosine similarity | "How similar two texts are" | The dot product of two unit vectors, a number in [-1, 1] |
| Vector database | "Searches by meaning" | A store that answers "nearest neighbors to this vector" instead of exact-key lookups |
| Brute-force / FLAT search | "Slow but exact" | Score every vector against the query; O(n), the ground truth |
| ANN | "Fast search" | Approximate nearest neighbor: an index (HNSW, IVF) that skips most of the work |
| HNSW | "The fancy graph index" | A layered graph that navigates to near neighbors without scanning the whole set |
| Collection / class / table | "Where my vectors go" | Vectors grouped with one schema and one index (Qdrant/Weaviate/Postgres words) |
| Payload / metadata / filter | "The extra columns" | Structured data attached to a vector, usable for pre-filtering results |
| Hybrid search | "Keywords + meaning" | Fusing BM25 keyword scores with vector scores (RRF), covering words embeddings miss |
| Recall@k | "Did it find the right ones" | Fraction of the exact top-k that the ANN index actually returned |

## Pre-Test

1. **What does cosine similarity between two embeddings measure?**
   - A) How many words the texts share
   - B) How aligned the two vectors are (similar meaning implies high score)
   - C) The difference in vector length
   - D) The number of dimensions they have in common
   - **Correct answer: B**

2. **Why can a vector database return slightly different results than a linear scan?**
   - A) Because cosine similarity is random
   - B) Because they use ANN indexes (like HNSW) that trade a little accuracy for speed
   - C) Because they store fewer dimensions than the embeddings
   - D) Because brute-force search is allowed to be wrong
   - **Correct answer: B**

3. **Which of these is a vector database extension for PostgreSQL?**
   - A) Faiss
   - B) Qdrant
   - C) pgvector
   - D) Chroma
   - **Correct answer: C**

## Post-Test

4. **You embed a document with `embed()` using a hashing trick and get a vector.
   What does the `1 - (embedding <=> %s)` SQL expression from 03_pgvector.py do?**
   - A) Converts cosine distance into cosine similarity so higher = more similar
   - B) Computes the L2 distance
   - C) Normalizes the vector to length 1
   - D) Counts matching dimensions
   - **Correct answer: A**

5. **A user searches "recipe" but your embeddings were trained without the word
   "recipe". Which feature is designed to still find relevant documents?**
   - A) Payload filtering
   - B) Hybrid search (BM25 + vector) as shown in 04_weaviate.py
   - C) The HNSW index
   - D) Cosine distance
   - **Correct answer: B**

6. **Qdrant (02), pgvector (03), and Weaviate (04) represent what three
   philosophies, in order?**
   - A) Specialist DB / extension on Postgres / AI-native with hybrid search
   - B) Library / server / cloud API
   - C) Graph / document / key-value
   - D) GPU / CPU / in-memory
   - **Correct answer: A**

7. **In the real world you would reach for which tool given: "We already run
   Postgres, small team, tens of millions of vectors, want SQL joins with
   application data"?**
   - A) Milvus (Kubernetes cluster)
   - B) pgvector
   - C) A hand-written linear scan
   - D) A key-value store
   - **Correct answer: B**