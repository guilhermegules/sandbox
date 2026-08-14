import pino from "pino";
import { v4 as uuidv4 } from "uuid";

const SERVICE_NAME = process.env.SERVICE_NAME || "url-shortener";
const ENV = process.env.NODE_ENV || "development";

function getCorrelationId(): string {
  return uuidv4();
}

export function createLogger() {
  return pino({
    name: SERVICE_NAME,
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      log(object) {
        return {
          ...object,
          service: SERVICE_NAME,
          environment: ENV,
        };
      },
    },
    serializers: {
      req(request: unknown) {
        const req = request as { method?: string; url?: string };
        return {
          method: req.method,
          url: req.url,
        };
      },
      err(error: unknown) {
        const err = error as {
          message?: string;
          stack?: string;
          cause?: unknown;
        };
        return {
          message: err.message,
          stack: err.stack,
          cause: err.cause,
        };
      },
    },
  });
}

export function createChildLogger(
  parent: pino.Logger,
  context: Record<string, unknown>
): pino.Logger {
  return parent.child(context);
}

export { ENV, getCorrelationId, SERVICE_NAME };
