# Apache Camel - File Transformation POC

First POC demonstrating Apache Camel's core concept: **a route describes the path a message travels between endpoints**.

## Apache Camel Common Use Cases

| Use Case | Description | Example Components |
|----------|-------------|-------------------|
| **Integration** | Connect different systems (ERP, CRM, databases) | `file`, `ftp`, `sftp` |
| **Message Routing** | Route messages between systems based on content | `direct`, `seda`, `jms` |
| **Data Transformation** | Convert formats (JSON, XML, CSV, Protobuf) | `jacksonxml`, `jaxb`, `csv` |
| **API Gateway** | Expose REST APIs with load balancing | `rest`, `undertow`, `netty` |
| **Event-Driven Architecture** | Publish/subscribe to events | `kafka`, `rabbitmq`, `activemq` |
| **ETL Pipelines** | Extract, transform, load data between systems | `jdbc`, `mongodb`, `file` |
| **Microservices** | Service orchestration and composition | `rest`, `http`, `circuit-breaker` |
| **Batch Processing** | Scheduled jobs and batch operations | `quartz`, `cron`, `file` |
| **Cloud Integration** | Connect to cloud services (AWS, Azure, GCP) | `aws-s3`, `azure-eventhubs`, `google-pubsub` |
| **Protocol Bridge** | Convert between protocols (HTTP↔JMS, REST↔SOAP) | `netty`, `cxf`, `jms` |

### Popular Components (800+ available)

```
File:      file, ftp, sftp, ssh
Messaging: kafka, rabbitmq, activemq, jms, stm
REST:      rest, undertow, netty, servlet
Database:  jdbc, mongodb, elasticsearch
Cloud:     aws-s3, azure-eventhubs, google-pubsub
Transform: jacksonxml, jacksonjson, csv, bindy
Utility:   timer, quartz, seda, direct
```

## What This POC Does

```
input/orders.json
        │
   Camel Route
        │
  validate order
        │
  add timestamp
        │
output/processed-orders.json
```

## What You Learn

| Concept | Where |
|---------|-------|
| `from("file:...")` | `App.java:38` — reads from input folder |
| `to("file:...")` | `App.java:44` — writes to output folder |
| `Processor` | `OrderProcessor.java` — validates and transforms |
| Headers/Body | `${header.CamelFileName}`, `${body}` |
| Logs | `.log(...)` in route, `log.info()` in processor |
| Error handling | try-catch with error JSON response |

## Project Structure

```
file-transformation/
├── pom.xml                              ← Maven config (Java 25, Camel 4.10)
├── README.md                            ← This file
├── src/main/java/com/example/
│   ├── App.java                         ← Route definition + main
│   └── OrderProcessor.java              ← Validation + transformation logic
├── src/main/resources/
│   └── logback.xml                      ← Logging configuration
├── input/
│   ├── orders.json                      ← Valid order (full example)
│   ├── valid-order.json                 ← Valid order (minimal)
│   ├── error-missing-orderId.json       ← orderId: "" → ERROR
│   ├── error-no-orderId.json            ← orderId field missing → ERROR
│   ├── error-missing-customer.json      ← customer: "" → ERROR
│   ├── error-invalid-total.json         ← total: -135 → ERROR
│   └── error-zero-total.json            ← total: 0 → ERROR
└── output/                              ← Processed files appear here
```

## Prerequisites

- Java 25+
- Maven 3.9+

## How to Run

```bash
# Navigate to project
cd apache-camel/file-transformation

# Compile
mvn clean compile

# Run
mvn exec:java
```

The application will start watching the `input/` folder for `.json` files.

## How to Test

### 1. Copy a file to input (in another terminal)

```bash
cp input/orders.json input/
```

### 2. Watch the logs

```
INFO  App - Starting Apache Camel File Transformation POC
INFO  App - Route started. Watching input/ folder for JSON files...
INFO  OrderProcessor - Processing file: orders.json
INFO  OrderProcessor - Order ORD-001 processed successfully
```

### 3. Check the output

```bash
cat output/processed-orders.json
```

## Expected Output

```json
{
  "orderId" : "ORD-001",
  "customer" : "João Silva",
  "email" : "joao.silva@email.com",
  "items" : [ ... ],
  "total" : 9200.00,
  "currency" : "BRL",
  "status" : "PROCESSED",
  "processedAt" : "2026-09-10T12:30:00Z",
  "originalFile" : "orders.json"
}
```

## Error Handling Test

Each error file tests a specific validation:

```bash
# Missing orderId (empty string)
cp input/error-missing-orderId.json input/

# orderId field completely absent
cp input/error-no-orderId.json input/

# Missing customer (empty string)
cp input/error-missing-customer.json input/

# Invalid total (negative)
cp input/error-invalid-total.json input/

# Zero total
cp input/error-zero-total.json input/
```

All error cases output:

```json
{
  "status" : "ERROR",
  "errorMessage" : "Missing or empty orderId",
  "processedAt" : "2026-09-10T12:35:00Z"
}
```

## How the Route Works

```java
from("file:input?noop=true&include=.*\\.json&delay=1000")
    .routeId("file-transformation-route")
    .log(">>> Received file: ${header.CamelFileName}")
    .log(">>> File size: ${header.CamelFileLength} bytes")
    .process(new OrderProcessor())
    .log(">>> Transformed body length: ${body.length()}")
    .to("file:output?fileName=processed-${header.CamelFileName}")
    .log(">>> File written to output folder");
```

| Step | Description |
|------|-------------|
| `from("file:input?noop=true&include=.*\\.json&delay=1000")` | Polls `input/` every 1s, only `.json` files, keeps originals (`noop=true`) |
| `.routeId(...)` | Names the route for monitoring |
| `.log(...)` | Logs message at each step |
| `.process(new OrderProcessor())` | Custom logic: parse JSON, validate, transform |
| `.to("file:output?fileName=processed-...")` | Writes transformed body to `output/` |

## Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| Apache Camel Core | 4.10.0 | Route engine |
| Apache Camel File | 4.10.0 | File endpoint |
| Apache Camel Jackson | 4.10.0 | JSON support |
| Jackson Databind | 2.18.0 | JSON parsing |
| Logback | 1.5.12 | Logging |
