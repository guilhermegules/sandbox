# Quarkus Validation Project

## Overview
**Quarkus** ("Supersonic Subatomic Java") is a Kubernetes-native Java stack tailored for OpenJDK and GraalVM, crafted from best-of-breed Java libraries and standards (Jakarta RESTful Web Services, MicroProfile, Hibernate ORM, Vert.x, Netty).

## Core Responsibilities & What It Solves
- **Container-First Architecture**: Sub-second startup time and tiny memory footprint (tens of megabytes of RSS rather than hundreds).
- **Build-Time Optimization**: Moves reflection, dynamic class loading, and metadata processing from application runtime to compile/build time (via ArC CDI).
- **GraalVM Native Image Ready**: Ahead-Of-Time (AOT) compilation produces lightweight standalone Linux binaries without needing a JVM at runtime.
- **Unified Reactive & Imperative Model**: Non-blocking reactive engine (powered by Vert.x underneath) that seamlessly accommodates imperative blocking workflows.
- **Developer Joy**: Zero-config live reload (`quarkus dev`), Dev Services (automatic testcontainers for databases/Kafka), and continuous testing.

## Quarkus vs Spring Boot vs Micronaut vs Vert.x
| Feature | Quarkus | Spring Boot | Micronaut | Eclipse Vert.x |
| :--- | :--- | :--- | :--- | :--- |
| **Philosophy** | Kubernetes-native, build-time AOT | Convention-over-configuration, enterprise standard | AOT compile-time dependency injection | Unopinionated reactive toolkit |
| **Startup Time** | Milliseconds (Native) / < 1.5s (JVM) | ~2-5s (JVM) | < 1s (JVM) | Milliseconds |
| **Memory (RSS)** | ~25 MB (Native) / ~100 MB (JVM) | ~200-400 MB (JVM) | ~100-150 MB (JVM) | ~50 MB |
| **DI Mechanism** | ArC (Build-time CDI) | Spring IoC (Runtime reflection/proxies) | Compile-time AST processing | None built-in |
| **Standard APIs** | Jakarta EE + Eclipse MicroProfile | Spring Framework annotations | JSR-330 / Micronaut annotations | Vert.x specific APIs |

## Project Structure
- `com.example.quarkus.service.GreetingService`: `@ApplicationScoped` CDI bean reading `@ConfigProperty`.
- `com.example.quarkus.model.ProductRecord`: Java record serialization model.
- `com.example.quarkus.resource.GreetingResource`: RESTEasy Reactive endpoints (`/api/greeting`, `/api/products`).
- `src/main/resources/application.properties`: Configuration properties.
- `com.example.quarkus.QuarkusValidationTest`: `@QuarkusTest` using RestAssured verifying HTTP responses and JSON bodies.

## How to Build and Run
```bash
# Run tests
mvn clean test

# Run in live-reload dev mode
mvn quarkus:dev

# Build native executable (requires GraalVM or Docker/Podman)
mvn clean package -Dnative
```
