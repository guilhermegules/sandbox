# Gson Validation Project

## Overview
**Google Gson** is an open-source Java library developed by Google to convert Java Objects into their JSON representation and vice versa (`JSON <-> Java`).

## Core Responsibilities & What It Solves
- **Lightweight JSON processing**: Zero external dependencies, minimal footprint.
- **Record and POJO support**: Automatically maps properties, constructors, and getters.
- **Generic Preservation**: Overcomes Java runtime type erasure via `TypeToken`.
- **Custom Serialization/Deserialization**: Provides `TypeAdapter` (streaming, high-performance) and `JsonSerializer`/`JsonDeserializer` (tree model).
- **Naming Policies**: Configurable field naming out of the box (e.g. `LOWER_CASE_WITH_UNDERSCORES`, `UPPER_CAMEL_CASE`).

## Gson vs Competitors
| Feature | Gson | Jackson | Moshi |
| :--- | :--- | :--- | :--- |
| **Footprint / Dependencies** | Single JAR (~300 KB), zero transitive deps | Multiple JARs (`core`, `databind`, `annotations`) | Lightweight (~200 KB), Kotlin-friendly |
| **Performance** | Good for small/medium payloads | Industry-standard streaming throughput | Highly optimized for Android / Kotlin |
| **Java Records Support** | Supported in modern releases (2.10+) | Supported via `jackson-databind` | First-class Kotlin/Java support |
| **Default in Frameworks** | Google libraries, Android legacy | Spring Boot, Quarkus default | Modern Android (Jetpack/Square) |
| **Architecture** | Simple API: `new Gson().toJson(...)` | Highly modular with extensive SPI plugins | Code-generation / Reflective adapters |

## Project Structure
- `com.example.gson.model`: Domain records (`Product`, `Order`, `OrderStatus`).
- `com.example.gson.adapter.InstantAdapter`: Custom stream-based `TypeAdapter<Instant>` for ISO-8601 formatting.
- `com.example.gson.GsonValidationApp`: Executable demonstration of serialization, naming policies, and `TypeToken`.
- `com.example.gson.GsonValidationTest`: JUnit 5 + AssertJ tests validating serialization, deserialization, null handling, and type safety.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
