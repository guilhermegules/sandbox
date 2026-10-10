# Resilience4j Validation Project

## Overview
**Resilience4j** is a lightweight, easy-to-use fault tolerance library inspired by Netflix Hystrix, but designed from the ground up for Java 8+ and functional programming. Unlike Hystrix, Resilience4j does not require external RxJava dependencies or thread-pool overhead; it uses decorators on functional interfaces (`Supplier`, `Runnable`, `Function`).

## Core Responsibilities & What It Solves
- **Circuit Breaker**: Prevents cascading failures by halting calls to failing remote dependencies (`CLOSED` -> `OPEN` -> `HALF_OPEN`).
- **Rate Limiter**: Controls throughput to comply with API quotas and prevent resource saturation (`limitForPeriod`, `refreshPeriod`).
- **Retry**: Transparently retries transient network glitches with exponential backoff and retry exception predicates.
- **Bulkhead**: Isolates resources using concurrent call limits (Semaphore) or dedicated bounded ThreadPools to prevent one slow dependency from exhausting all application threads.
- **TimeLimiter**: Enforces strict execution deadlines on `CompletableFuture` operations.
- **Decorator Composition**: Fluent stacking (`Decorators.ofSupplier(...).withCircuitBreaker(...).withRetry(...).withRateLimiter(...).withFallback(...)`).

## Resilience4j vs Netflix Hystrix vs Spring Retry vs Service Mesh
| Feature | Resilience4j | Netflix Hystrix | Spring Retry | Istio / Service Mesh |
| :--- | :--- | :--- | :--- | :--- |
| **Status** | Active, industry standard | **Deprecated** by Netflix in 2018 | Active (Spring specific) | Active (Infrastructure layer) |
| **Architecture** | In-process, functional decorators | In-process Command pattern (`HystrixCommand`) | AOP annotations (`@Retryable`) | Sidecar proxy (Envoy) outside JVM |
| **Performance** | Minimal overhead, non-blocking | Thread-pool isolation overhead per command | Lightweight reflection/AOP | Network hop latency per sidecar |
| **Patterns Supported** | CircuitBreaker, Retry, RateLimiter, Bulkhead, TimeLimiter | CircuitBreaker, Bulkhead, Fallback | Retry, CircuitBreaker (basic) | Retry, Timeout, CircuitBreaker |
| **Application Context** | Works in standard Java, Spring, Quarkus, Micronaut | Legacy apps | Spring Framework | Polyglot microservices |

## Project Structure
- `com.example.resilience.client.PaymentGatewayClient`: Simulated remote payment client with controllable outages.
- `com.example.resilience.service.ResilienceManager`: Central configuration for CircuitBreaker, Retry, RateLimiter, Bulkhead, and stacked decorators.
- `com.example.resilience.ResilienceValidationApp`: Executable demonstration of resilience pipelines and state changes.
- `com.example.resilience.ResilienceValidationTest`: JUnit 5 tests validating retries, circuit breaking, rate limiting, and fallbacks.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
