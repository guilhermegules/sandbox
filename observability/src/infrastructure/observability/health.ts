import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPrisma } from "../database/PrismaClient.js";
import { SERVICE_NAME } from "./logger.js";
import { eventLoopLag, register, updateResourceMetrics } from "./metrics.js";

export async function healthCheckRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get("/health", async () => {
    return { status: "ok", service: SERVICE_NAME };
  });

  fastify.get(
    "/ready",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const checks: Record<string, string> = {};
      let isReady = true;

      try {
        const prisma = getPrisma();
        await prisma.$queryRaw`SELECT 1`;
        checks.database = "ok";
      } catch {
        checks.database = "error";
        isReady = false;
      }

      if (!isReady) {
        reply.status(503);
      }

      return { status: isReady ? "ready" : "not_ready", checks };
    }
  );

  fastify.get(
    "/metrics",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header("Content-Type", register.contentType);
      return register.metrics();
    }
  );
}

export function startPerformanceMonitoring(intervalMs = 10000): void {
  const performanceInterval = setInterval(() => {
    updateResourceMetrics();

    try {
      const { performance } = require("node:perf_hooks");
      const lag = performance.eventLoopLag?.();
      if (lag !== undefined) {
        eventLoopLag.set(lag / 1000);
      }
    } catch {
      // perf_hooks not available in all environments
    }
  }, intervalMs);

  performanceInterval.unref();
}
