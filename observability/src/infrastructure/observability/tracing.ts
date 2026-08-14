import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { NodeSDK } from "@opentelemetry/sdk-node";

const SERVICE_NAME = process.env.SERVICE_NAME || "url-shortener";
const ENV = process.env.NODE_ENV || "development";

let sdk: NodeSDK | null = null;

export function initTracing(): NodeSDK {
  const traceExporter = new OTLPTraceExporter({
    url:
      process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
      "http://localhost:4318/v1/traces",
  });

  sdk = new NodeSDK({
    serviceName: SERVICE_NAME,
    traceExporter,
    instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
  });

  sdk.start();

  process.on("SIGTERM", () => {
    sdk?.shutdown().catch(console.error);
  });

  return sdk;
}

export { ENV, SERVICE_NAME };
