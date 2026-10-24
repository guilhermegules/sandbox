# Apache Camel Validation Project

## Overview
**Apache Camel** is an open-source integration framework based on known **Enterprise Integration Patterns (EIP)**. It allows developers to define routing, mediation, and transformation rules using fluent Java DSL across hundreds of protocols and data formats.

## Core Responsibilities & What It Solves
- **Enterprise Integration Patterns**: Content-Based Router (`choice`), Splitter (`split`), Aggregator (`aggregate`), Filter (`filter`), Wire Tap, Message Translator (`process`/`transform`).
- **300+ Pre-built Connectors**: Connect effortlessly to Kafka, JMS, AWS S3/SQS, HTTP/REST, Salesforce, SQL databases, files, and more without writing custom network glue code.
- **Protocol Mediation**: Seamlessly convert between disparate protocols and formats (e.g., CSV from an FTP server converted into JSON messages published to a Kafka topic).
- **Resilient Error Handling**: Centralized `onException`, Dead Letter Channel (`deadLetterChannel`), retries with exponential backoff.
- **Decoupled Testing**: In-memory test harness with `MockEndpoint` for asserting message count, headers, and payloads.

## Apache Camel vs Alternatives
| Feature | Apache Camel | Spring Integration | Kafka Streams | Mule ESB |
| :--- | :--- | :--- | :--- | :--- |
| **Philosophy** | Universal EIP routing engine | Spring-centric messaging abstraction | Event-stream processing atop Kafka topics | Heavy commercial ESB platform |
| **Connectors** | 300+ out of the box | Extensive Spring ecosystem integrations | Limited to Kafka topics & state stores | Proprietary connectors |
| **DSL Style** | Fluent Java DSL, YAML, XML | Spring Java DSL & `@MessagingGateway` | Topology builder (functional stream DSL) | Graphical flow designer / XML |
| **Deployment** | Standalone Java, Spring Boot, Quarkus | Spring Boot | Any JVM app consuming Kafka | Mule runtime / CloudHub |

## Project Structure
- `com.example.camel.routes.OrderRoutingRouteBuilder`: Implements Content-Based Routing, Splitter EIP, and `onException` handling.
- `com.example.camel.CamelValidationApp`: Executable demonstration invoking routes with `ProducerTemplate`.
- `com.example.camel.CamelValidationTest`: JUnit 5 tests using `CamelTestSupport` and `MockEndpoint`.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
