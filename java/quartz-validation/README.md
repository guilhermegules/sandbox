# Quartz Enterprise Scheduler Validation Project

## Overview
**Quartz** is an enterprise-grade, richly featured open-source job scheduling library that can be integrated into virtually any Java application—from the smallest standalone application to the largest enterprise e-commerce system.

## Core Responsibilities & What It Solves
- **Dynamic Job Scheduling**: Create, reschedule, pause, and delete jobs dynamically at runtime.
- **Trigger Flexibility**: SimpleTrigger (interval / count) and CronTrigger (cron expressions like `0 0 12 * * ?`).
- **Clustering & Persistence**: Support for JDBC JobStores (`JobStoreTX`, `JobStoreCMT`) allowing clustered high availability, failover, and misfire handling across distributed JVMs.
- **Job Concurrency Control**: `@DisallowConcurrentExecution` prevents overlapping executions of the same job instance.
- **State Persistence**: `@PersistJobDataAfterExecution` updates job parameters across successive executions.
- **Lifecycle Interception**: `JobListener`, `TriggerListener`, and `SchedulerListener` for monitoring and auditing.

## Quartz vs Alternatives
| Feature | Quartz | Spring `@Scheduled` / `ScheduledExecutorService` | ShedLock | Temporal / Cadence |
| :--- | :--- | :--- | :--- | :--- |
| **Dynamic Scheduling** | Full runtime API (schedule/pause/delete) | Mostly static annotations defined at startup | Static annotations with lock | Code-as-workflows orchestrator |
| **Clustered Failover** | Native JDBC JobStore clustering | None (fires on every replica simultaneously) | Distributed DB lock to avoid duplicate runs | Fully distributed event-sourced workflows |
| **Stateful Jobs** | Built-in `JobDataMap` persistence | In-memory only | Lock metadata only | Full history persistence |
| **Misfire Handling** | Configurable policies (fire now, ignore, etc.) | Basic or none | Skips or runs depending on lock | Built-in replay & retry policies |

## Project Structure
- `com.example.quartz.job.InventoryReportJob`: Job implementation decorated with `@DisallowConcurrentExecution`.
- `com.example.quartz.listener.AuditJobListener`: Lifecycle interceptor auditing trigger starts, vetoes, and completions.
- `com.example.quartz.scheduler.QuartzSchedulerManager`: Configures RAMJobStore, listener registration, and scheduling helpers.
- `com.example.quartz.QuartzValidationApp`: Standalone executable running scheduled triggers.
- `com.example.quartz.QuartzValidationTest`: JUnit 5 tests validating execution counts, pausing, and resuming.

## How to Build and Run
```bash
# Run unit tests
mvn clean test

# Run executable showcase
mvn compile exec:java
```
