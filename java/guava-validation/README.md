# Guava Validation Project

## Overview
**Google Guava** is Google's core open-source set of common libraries for Java, including new collection types, graph library, concurrency primitives, caching, primitives, string processing, and I/O utilities.

## Core Responsibilities & What It Solves
- **Specialized Collection Types**: `Multimap` (multi-valued maps), `BiMap` (invertible maps), `Table` (2D coordinate matrices), `Multiset` (frequency bags).
- **In-Memory Caching**: `LoadingCache` with LRU eviction, time-based expiration (`expireAfterWrite`/`expireAfterAccess`), and detailed metrics (`recordStats`).
- **Enhanced Concurrency**: `ListenableFuture`, `Futures.transform`, `Futures.allAsList`, and `ListeningExecutorService` for fluent asynchronous composition.
- **Defensive Programming**: `Preconditions` (`checkNotNull`, `checkArgument`, `checkState`).

## Guava vs Standard Java (21+) & Alternatives
| Feature | Guava | Modern Java (Java 21+) | Caffeine / Apache Commons |
| :--- | :--- | :--- | :--- |
| **Immutable Collections** | `ImmutableList`, `ImmutableSet`, `ImmutableMap` (builder & copyOf) | `List.of()`, `Set.of()`, `Map.of()` (built into JDK) | Commons Collections |
| **Multimap / BiMap / Table** | Fully supported, specialized interfaces | Not in standard JDK (requires manual nested maps) | Commons MultiValuedMap |
| **In-Memory Caching** | Built-in `CacheBuilder` | None built-in (must use third-party) | **Caffeine** is Guava Cache's modern successor (W-TinyLFU algorithm, higher throughput) |
| **Async Futures** | `ListenableFuture` (callback based) | `CompletableFuture` (built-in reactive chain) | Project Reactor / RxJava |
| **Rate Limiter** | Built-in `RateLimiter` (token bucket) | None built-in | Resilience4j RateLimiter / Bucket4j |

## Project Structure
- `com.example.guava.collections.GuavaCollectionsShowcase`: Demonstrations of `Multimap`, `BiMap`, `Table`, and `Multiset`.
- `com.example.guava.cache.GuavaCacheService`: Thread-safe `LoadingCache` with stats and simulated DB loader.
- `com.example.guava.concurrency.GuavaConcurrencyService`: Asynchronous tasks via `ListenableFuture` and `Futures.transform`.
- `com.example.guava.GuavaValidationApp`: Executable runner showcasing all components.
- `com.example.guava.GuavaValidationTest`: JUnit 5 + AssertJ tests.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
