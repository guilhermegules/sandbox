# Eclipse Vert.x Validation Project

## Overview
**Eclipse Vert.x** is a polyglot, non-blocking, event-driven toolkit on top of Netty for building reactive applications on the JVM. Rather than imposing an opinionated full-stack architecture, Vert.x is modular ("a toolkit, not a framework"), allowing developers to use only what they need.

## Core Responsibilities & What It Solves
- **Multi-Reactor Event Loop Architecture**: Handles thousands of concurrent TCP/HTTP connections on a small number of event loop threads without thread-per-request overhead.
- **The Event Bus**: The nervous system of Vert.x, enabling seamless distributed or in-process messaging between verticles (Point-to-Point, Request-Response, Publish-Subscribe).
- **Asynchronous & Non-Blocking**: Idiomatic `Future` / `Promise` composition to coordinate asynchronous operations without blocking the thread.
- **Extensible Web Engine**: `vertx-web` provides composable routing, security handlers, body parsing, and WebSocket handling.
- **Microservices & Reactive Systems**: Foundation upon which frameworks like Quarkus build their reactive engine.

## Eclipse Vert.x vs Alternatives
| Feature | Eclipse Vert.x | Spring WebFlux / Project Reactor | Quarkus Reactive | Node.js |
| :--- | :--- | :--- | :--- | :--- |
| **Model** | Event Loop Verticle toolkit | Reactive Streams (`Flux` / `Mono`) | Quarkus full-stack + Vert.x engine | Single-threaded JavaScript event loop |
| **Opinionation** | Unopinionated toolkit | Opinionated Spring Framework | Opinionated Kubernetes-native framework | Unopinionated Node ecosystem |
| **Inter-Component Messaging** | Built-in Event Bus | In-memory sinks / External broker | Vert.x EventBus or SmallRye Reactive | External queues / EventEmitter |
| **Virtual Threads (Loom)** | Supported alongside event loops | Supported in Spring Boot 3+ | Supported in Quarkus | N/A (single-threaded JS) |
| **Throughput & Footprint** | Extremely high throughput, very low RAM | High throughput, moderate RAM | Extremely high throughput, native GraalVM binary | High I/O throughput, single-core limit |

## Project Structure
- `com.example.vertx.verticle.OrderWorkerVerticle`: Reactive worker verticle consuming from the Event Bus and calculating taxes.
- `com.example.vertx.verticle.HttpServerVerticle`: Non-blocking HTTP server exposing `/api/health` and `/api/orders`.
- `com.example.vertx.VertxValidationApp`: Executable demonstration deploying verticles and querying the API via `WebClient`.
- `com.example.vertx.VertxValidationTest`: JUnit 5 tests using `vertx-junit5` and `VertxTestContext`.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
