# Google gRPC Validation Project

## Overview
**Google gRPC** is a modern, high-performance, open-source Remote Procedure Call (RPC) framework that can run anywhere. It uses **HTTP/2** for transport and **Protocol Buffers (Protobuf)** as its interface definition language and binary serialization mechanism.

## Core Responsibilities & What It Solves
- **Strict Schema Contract**: Clear service definition via `.proto` files with backward/forward compatibility rules.
- **Binary Serialization**: Protocol Buffers produce compact binary payloads dramatically smaller and faster to serialize/deserialize than text-based JSON.
- **Multiplexed HTTP/2 Transport**: True bidirectional streaming over a single TCP connection, header compression (HPACK), and flow control.
- **Streaming Patterns**: Unary (1:1), Server Streaming (1:N), Client Streaming (N:1), and Bidirectional Streaming (N:M).
- **Interceptors**: Cross-cutting middleware for authentication, observability, tracing, and deadline propagation.
- **Deadlines & Cancellation**: Built-in request timeouts propagated across microservice call chains.

## gRPC vs REST vs GraphQL vs WebSocket
| Feature | gRPC | REST (HTTP/1.1 + JSON) | GraphQL | WebSocket |
| :--- | :--- | :--- | :--- | :--- |
| **Protocol** | HTTP/2 binary | HTTP/1.1 or HTTP/2 text | HTTP (POST) text | TCP-based duplex framing |
| **Payload** | Protobuf (compact binary) | JSON (verbose text) | JSON (verbose text) | Custom / text / binary |
| **Contract** | Strict `.proto` schema | Optional (OpenAPI / Swagger) | Strict GraphQL Schema | None built-in |
| **Streaming** | Native 4 streaming types | Server-Sent Events (SSE) / Chunked | Subscriptions | Full-duplex raw frames |
| **Browser Support** | Requires gRPC-Web proxy | Universal first-class support | Universal first-class support | Universal first-class support |
| **Best Used For** | Low-latency East-West microservices | Public APIs, North-South traffic | Frontend client data aggregation | Real-time chat, gaming |

## Project Structure
- `src/main/proto/product.proto`: Service definition and message contracts.
- `com.example.grpc.service.ProductServiceImpl`: Server implementation extending `ProductServiceGrpc.ProductServiceImplBase`.
- `com.example.grpc.interceptor.AuthServerInterceptor`: Security interceptor validating `x-api-key` header metadata.
- `com.example.grpc.GrpcValidationApp`: Executable demonstration with in-process server/client and server-streaming iteration.
- `com.example.grpc.GrpcValidationTest`: JUnit 5 tests verifying unary RPC, server streaming, error statuses (`NOT_FOUND`), and authentication rejection (`UNAUTHENTICATED`).

## How to Build and Run
```bash
# Compile protobuf definitions and run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
