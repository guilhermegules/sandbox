# Observability: SLA, SLO, and SLI

## What is Observability?

Observability is the ability to measure the internal states of a system by examining its outputs.
In software engineering, it means being able to understand what's happening inside your application by collecting and analyzing external data:

- **Logs**: Discrete events with timestamps
- **Metrics**: Numerical measurements aggregated over time
- **Traces**: End-to-end requests across service boundaries

A system is observable when you can answer questions about its behavior without having to add new code.

## Why Observability Matters

| Aspect                     | Description                                    |
| -------------------------- | ---------------------------------------------- |
| **Faster Debugging**       | Quickly identify root causes when issues arise |
| **Proactive Monitoring**   | Detect problems before users notice            |
| **Better Decision Making** | Data-driven insights for capacity planning     |
| **Customer Trust**         | Meet reliability commitments                   |
| **Continuous Improvement** | Understand how changes affect performance      |

## SLA - Service Level Agreement

An SLA is a commitment between a service provider and a customer. It defines the expected level of service, including what happens if those standards aren't met.

### Example SLA

```
99.9% uptime per month
- Max downtime: 43.8 minutes/month
- Max consecutive downtime: 4 minutes
- Compensation: 10% credit if SLA breached
```

### SLA Components

1. **Availability**: Uptime percentage (e.g., 99.9%)
2. **Latency**: Response time thresholds (e.g., P95 < 200ms)
3. **Support**: Response times for incidents
4. **Penalties**: Financial consequences for missing SLA

## SLO - Service Level Objective

An SLO is an internal target that teams aim for to meet the SLA. It's typically stricter than the SLA to provide a safety buffer.

### Example SLOs

| Metric       | SLA    | SLO (Internal Target) |
| ------------ | ------ | --------------------- |
| Availability | 99.9%  | 99.95%                |
| P99 Latency  | 500ms  | 300ms                 |
| Error Rate   | < 0.1% | < 0.05%               |

### Why Have Stricter SLOs?

```
SLA: 99.9% (breached at 44 min downtime)
SLO: 99.95% (breached at 22 min downtime)

Buffer: 22 minutes to fix issues before SLA breach
```

## SLI - Service Level Indicator

An SLI is a quantitative measure of some aspect of the level of service that is provided. It's the actual metric you track.

### Common SLIs

```
Availability SLI = (successful requests / total requests) × 100

Latency SLI = percentage of requests below threshold

Error SLI = percentage of requests resulting in errors
```

### SLI Formulas

| SLI Type     | Formula                                 |
| ------------ | --------------------------------------- |
| Availability | `good_requests / total_requests`        |
| Latency      | `requests < threshold / total_requests` |
| Freshness    | `entries < max_age / total_entries`     |
| Throughput   | `requests processed / time_unit`        |

## Error Budgets

An error budget is the amount of unreliability you're willing to tolerate. It's calculated from your SLO.

### Example

```
SLO: 99.9% availability
Error Budget: 0.1% per month

If month = 30 days:
- Total minutes = 43,200
- Error budget = 43.2 minutes

Teams can "spend" this budget on:
- New feature deployments
- Experimentation
- Planned maintenance
```

## Best Practices

### Start with SLOs, Not SLAs

- Define what "good enough" looks like internally
- Measure and iterate before making external commitments

### Choose the Right SLIs

- Focus on user-facing metrics
- Avoid vanity metrics
- Measure what matters to customers

### Alert on SLO Burn Rate

- Track how fast you're consuming your error budget
- Alert before you breach your SLO

### Review Regularly

- Quarterly SLO reviews
- Adjust based on learnings
- Communicate to stakeholders

## Further Reading

- [Google SRE Book - SLIs, SLOs, SLAs](https://sre.google/sre-book/service-level-objectives/)
- [Error Budgets](https://www.atlassian.com/br/incident-management/kpis/error-budgets)
- [What is Observability?](https://www.ibm.com/think/topics/observability)
