# Event-Driven Microservices

A modern microservices architecture built with NestJS that demonstrates event-driven communication patterns between services using Redis and message queues. This project implements a complete order management system with inventory checking and service-to-service communication.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Services](#services)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Services](#running-the-services)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Docker](#docker)

## 🎯 Project Overview

This is a monorepo project using **pnpm workspaces** that demonstrates a scalable, event-driven microservices architecture. Services communicate asynchronously through a message queue system using Redis, enabling loose coupling and high scalability.

The system implements an order creation flow where:
1. A client submits an order through the Gateway API
2. The Orders service processes the order and publishes an event
3. The Inventory service listens to the event and checks stock availability
4. Services communicate without direct dependencies

## 🏗️ Architecture

```
┌─────────────┐
│   Gateway   │
│   (API)     │
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────────────────────────┐
│      Redis Message Queue        │
└──────┬──────────────────────────┘
       │
       ├─────────────────┐
       ▼                 ▼
    ┌────────┐      ┌──────────┐
    │ Orders │      │Inventory │
    │Service │      │ Service  │
    └────────┘      └──────────┘

  Shared Event Types ─> @mono/common
```

## 🔧 Services

### Gateway Service
- **Purpose**: API gateway serving as the entry point for all external requests
- **Port**: 3000
- **Responsibilities**:
  - Accepts HTTP requests from clients
  - Routes requests to appropriate microservices
  - Provides REST endpoints for order creation
- **Key Endpoints**:
  - `POST /api/gateway/orders` - Create a new order

### Orders Service
- **Purpose**: Handles order creation and processing
- **Port**: 3001
- **Responsibilities**:
  - Processes order creation requests
  - Publishes `OrderCreatedEvent` to the message queue
  - Handles order validation and creation logic
- **Message Patterns**:
  - `create-order` - Processes order creation

### Inventory Service
- **Purpose**: Manages inventory and stock checking
- **Port**: 3002
- **Responsibilities**:
  - Listens for order creation events
  - Checks stock availability
  - Returns inventory status
- **Message Patterns**:
  - `check-stock` - Checks if items are available in inventory

### Common Library (@mono/common)
- **Purpose**: Shared types and events across all services
- **Exports**:
  - `OrderCreatedEvent` - Event published when an order is created
  - Other shared types and utilities

## 💻 Technologies

- **Framework**: NestJS v11
- **Language**: TypeScript
- **Runtime**: Node.js (v24.13.1+)
- **Message Queue**: Redis with ioredis
- **Package Manager**: pnpm
- **Container**: Docker & Docker Compose
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

## 📦 Prerequisites

- **Node.js**: v22.x or higher
- **pnpm**: v10.x or higher
- **Docker** & **Docker Compose** (for containerized setup)
- **Redis**: 7.x or higher (via Docker or local installation)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd event-driven-microsservices
```

### 2. Install dependencies

```bash
pnpm install
```

This installs dependencies for all workspace packages including the three services and the common library.

## ▶️ Running the Services

### Option 1: Run All Services Together (Recommended)

Using the monorepo script:

```bash
pnpm start:all
```

This starts all three services concurrently:
- Gateway on `http://localhost:3000`
- Orders on `http://localhost:3001`
- Inventory on `http://localhost:3002`

### Option 2: Run Individual Services

**Gateway Service:**
```bash
pnpm start:gateway
```

**Orders Service:**
```bash
pnpm start:orders
```

**Inventory Service:**
```bash
pnpm start:inventory
```

### Option 3: Run Services in Development Mode

For development with hot-reload:

```bash
# All services
pnpm start:all

# Individual service
pnpm --filter=gateway start:dev
pnpm --filter=orders start:dev
pnpm --filter=inventory start:dev
```

### Option 4: Using Docker Compose

```bash
docker-compose up
```

This will start all services and Redis in containerized environments.

## 📁 Project Structure

```
event-driven-microsservices/
├── apps/
│   ├── gateway/          # API Gateway service
│   │   ├── src/
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── orders/           # Orders microservice
│   │   ├── src/
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── ...
│   └── inventory/        # Inventory microservice
│       ├── src/
│       │   ├── app.controller.ts
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── ...
├── libs/
│   └── common/           # Shared library
│       ├── events/       # Event definitions
│       │   ├── index.ts
│       │   └── order-created.event.ts
│       ├── index.ts
│       └── package.json
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── tsconfig.base.json    # Base TypeScript configuration
├── docker-compose.yml    # Docker Compose configuration
└── package.json          # Root package configuration
```

## 🔌 API Endpoints

### Gateway API

#### Create Order
```http
POST /api/gateway/orders
Content-Type: application/json

{
  "productId": "123",
  "quantity": 5,
  "customerId": "cust-456"
}
```

**Response:**
```json
{
  "orderId": "order-789",
  "productId": "123",
  "quantity": 5,
  "status": "pending"
}
```

## 🛠️ Development

### Building Services

Build all services:
```bash
pnpm build:gateway
pnpm build:orders
pnpm build:inventory
```

## 🐳 Docker

### Build Docker Images

```bash
# Build all images
docker-compose build

# Build specific service
docker build -t event-driven/gateway -f apps/gateway/Dockerfile .
docker build -t event-driven/orders -f apps/orders/Dockerfile .
docker build -t event-driven/inventory -f apps/inventory/Dockerfile .
```

### Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Service Communication Flow

1. **Client Request**: Client sends HTTP POST to Gateway
2. **Gateway Processing**: Gateway validates request
3. **Orders Service**: Processes order through message pattern
4. **Event Publishing**: Orders service publishes `OrderCreatedEvent`
5. **Inventory Service**: Listens to event and checks stock
6. **Response**: Gateway receives response and returns to client

## 🔐 Environment Variables

Default configuration uses local development settings. For production, configure:

- `REDIS_URL` - Redis connection string
- `NODE_ENV` - Environment (development/production)
- Port numbers for each service
