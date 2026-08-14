import { Counter, Gauge, Histogram, Registry } from "prom-client";

const SERVICE_NAME = process.env.SERVICE_NAME || "url-shortener";
const ENV = process.env.NODE_ENV || "development";

export const register = new Registry();

register.setDefaultLabels({
  service: SERVICE_NAME,
  environment: ENV,
});

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency in seconds",
  labelNames: ["method", "route"],
  buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [register],
});

export const httpErrorsTotal = new Counter({
  name: "http_errors_total",
  help: "Total number of HTTP errors",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

export const businessMetrics = new Counter({
  name: "business_operations_total",
  help: "Total number of business operations",
  labelNames: ["operation"],
  registers: [register],
});

export const memoryUsage = new Gauge({
  name: "process_memory_usage_bytes",
  help: "Process memory usage in bytes",
  labelNames: ["type"],
  registers: [register],
});

export const cpuUsage = new Gauge({
  name: "process_cpu_usage_percent",
  help: "Process CPU usage percentage",
  registers: [register],
});

export const eventLoopLag = new Gauge({
  name: "nodejs_event_loop_lag_seconds",
  help: "Node.js event loop lag in seconds",
  registers: [register],
});

export const activeConnections = new Gauge({
  name: "http_active_connections",
  help: "Number of active HTTP connections",
  registers: [register],
});

export function recordRequestMetrics(
  method: string,
  route: string,
  statusCode: number,
  durationMs: number
): void {
  const normalizedRoute = route || "unknown";
  httpRequestsTotal.inc({
    method,
    route: normalizedRoute,
    status_code: statusCode,
  });
  httpRequestDuration.observe(
    { method, route: normalizedRoute },
    durationMs / 1000
  );

  if (statusCode >= 400) {
    httpErrorsTotal.inc({
      method,
      route: normalizedRoute,
      status_code: statusCode,
    });
  }
}

export function incrementBusinessMetric(operation: string): void {
  businessMetrics.inc({ operation });
}

export function updateResourceMetrics(): void {
  const mem = process.memoryUsage();
  memoryUsage.set({ type: "rss" }, mem.rss);
  memoryUsage.set({ type: "heapTotal" }, mem.heapTotal);
  memoryUsage.set({ type: "heapUsed" }, mem.heapUsed);
  memoryUsage.set({ type: "external" }, mem.external);
}

export { ENV, SERVICE_NAME };
