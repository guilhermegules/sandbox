# JDBC vs Spring Data JPA — comparison on Java 25 + Spring Boot 4 + PostgreSQL

A single Spring Boot 4 application exposing the **same REST API** twice against the **same PostgreSQL table**:

- `/api/jdbc/...` — hand-written SQL on `JdbcTemplate`
- `/api/jpa/...` — Spring Data JPA (Hibernate), zero hand-written SQL
- `/api/benchmark/...` — informal latency comparison of both implementations

Stack: **Java 25 (LTS)** · **Spring Boot 4.1.1** · Maven · **PostgreSQL 16** (Docker).

## Run it

```bash
docker compose up -d        # start PostgreSQL on localhost:5432
./mvnw spring-boot:run      # seeds 2000 rows on first start
```

## Endpoints

| Method | URI | Description |
| --- | --- | --- |
| GET | `/api/{jdbc\|jpa}/products` | list all products |
| GET | `/api/{jdbc\|jpa}/products/{id}` | one product |
| GET | `/api/{jdbc\|jpa}/products/count` | row count |
| POST | `/api/{jdbc\|jpa}/products` | create |
| PUT | `/api/{jdbc\|jpa}/products/{id}` | full update |
| DELETE | `/api/{jdbc\|jpa}/products/{id}` | delete |
| GET | `/api/benchmark/{jdbc\|jpa}?ops=500&mode=all` | run one implementation (`mode`: `read`, `write` or `all`) |
| GET | `/api/benchmark/summary?ops=500&mode=all` | run both + report the JDBC/JPA ratio |

```bash
curl -s localhost:8080/api/jdbc/products | head -c 300
curl -s 'localhost:8080/api/benchmark/summary?ops=300&mode=read'   # watch out: no cache buster, JDBC first always wins JIT less…
curl -X POST localhost:8080/api/jpa/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Widget","price":49.90,"stock":10}'
```

## How the comparison is structured

Both persistence layers implement the same `ProductOperations` interface, so they are
drop-in interchangeable:

| Concern | `JdbcProductRepository` | `JpaProductRepository` |
| --- | --- | --- |
| SQL written by | you, literally | Hibernate, generated from method names |
| Mapping result → object | hand-written `RowMapper` | the JPA entity + Hibernate |
| Insert | `INSERT … RETURNING id` | `entityManager.save()` |
| Update | `UPDATE products SET …` | load, mutate, `save()` (dirty checking) |
| Reuse a JDBC connection | HikariCP (same pool) | HikariCP (same pool) |
| Boilerplate for a record | ~25 lines | ~10 lines |

The files that matter:

- `src/main/java/.../repository/JdbcProductRepository.java` — pure JDBC
- `src/main/java/.../repository/ProductDataRepository.java` — the Spring Data interface
- `src/main/java/.../repository/JpaProductRepository.java` — Spring Data adapter
- `src/main/java/.../controller/BenchmarkController.java` — the benchmark
- `src/main/resources/schema.sql` — one `products` table shared by both

## What the benchmark does

For each implementation (`mode=all`, default `ops=500`) it loops `ops` times performing:

- `read` → `findById` on a random existing row
- `write` → `create` + `findById(created)` + `delete(created)` (table stays the same size)

Each iteration measures wall-clock time in-process with `System.nanoTime()`. The response
reports `totalMs`, average `µs/operation`, and (in `/summary`) the JDBC/JPA ratio.

### Read ≈, write slower (expected)

Expect whole-number differences, not order-of-magnitude, on read paths: both go over the
same Hikari pool, same socket, same Postgres. JPA's biggest constant overheads are entity
state tracking, HQL/JPQL → SQL translation and its caching layers — these are most visible
on write-heavy loops and on many-entity batch insert/update workloads. The JDBC path maps a
row to a record in a few lines; JPA pays a per-operation lifecycle cost for features you may
not even use here.

**Caveats (read the fine print):**
- This is an *informal* benchmark. Not JMH. No warm-up/convergence, no GC quieting, no
  statistical rigor. Use it to spot direction-of-difference, then verify with a load tool
  (k6, Gatling, JMeter) or a proper JMH harness.
- Postgres caches. Running `jdbc` first warms pages for `jpa`. Run `/summary` a few times
  and alternate.
- JIT: run with `ops` high enough (≥1000) that the first loop warms the JVM.

```bash
# sample
curl -s 'localhost:8080/api/benchmark/summary?ops=1000&mode=all'
```

## JDBC vs Spring Data JPA — the trade-offs

| Dimension | JDBC (`JdbcTemplate`) | Spring Data JPA |
| --- | --- | --- |
| **Learning curve** | needs SQL + JDBC | needs JPA semantics + SQL for tuning |
| **Code volume** | more boilerplate (mapping, statements) | derived queries, less glue |
| **SQL control** | total, explicit, portable to any tool | generated; escape hatches: `@Query`, projections |
| **Performance ceiling** | lowest possible per-op overhead | higher overhead; needs `@EntityGraph`, batching, `flush` planning to match |
| **N+1 & lazy loading** | you don't have lazy loading — you write the joins | real foot-gun; fix with `@EntityGraph` / `fetch() w/ query` |
| **Mapping & state** | stateless row → DTO/record | identity map, dirty checking, cascades |
| **Schema evolution** | migration tool (Flyway/Liquibase) | can generate DDL via `ddl-auto`, but use migrations anyway |
| **Transactions** | `@Transactional` on methods running SQL | same, plus full `EntityTransaction` |
| **Complex queries** | do everything with plain SQL | report queries get painful → native queries / JDBC anyway |
| **Backend-agnostic** | SQL largely portable at risk | DB dialect handled by Hibernate |

**Practical guidance (not dogma):**
- Greenfield CRUD-heavy app, small-medium domain → Spring Data JPA is productive and safe.
- Query-heavy, read models, bulk data, high-throughput write loops → JDBC (or JdbcTemplate)
  gives measurably lower latency and predictable SQL.
- Hybrid is idiomatic: JPA for transactional aggregates, JDBC/`JdbcTemplate` for bulk and
  read paths. Nobody should write an entire high-traffic app on one or the other.

## Configuration knobs

`application.yml`:

- `app.seed.target-count` — number of seeded rows (default `2000`), seeds only when empty
- `app.seed.batch-size` — rows per JDBC batch insert during seeding
- `spring.jpa.hibernate.jdbc.batch_size` — Hibernate JDBC batch (default `50`)
- `spring.jpa.open-in-view: false` — avoid the classic lazy-loading-in-OSIV foot gun

## Tests

`./mvnw verify` spins up a real PostgreSQL via **Testcontainers** (`postgres:16`) and checks:

1. both implementations return identical data and counts
2. create / find / update / delete behave identically
3. the HTTP endpoints (`/api/jdbc` vs `/api/jpa`) return identical payloads
4. the benchmark runs both sides and reports a positive ratio

```bash
./mvnw verify
```