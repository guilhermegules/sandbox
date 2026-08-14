import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { recordRequestMetrics } from "./metrics.js";

export function registerRequestHooks(fastify: FastifyInstance): void {
  const logger = fastify.log;

  fastify.addHook("onRequest", async (request: FastifyRequest) => {
    logger.info({
      msg: "Request started",
      requestId: request.id,
      correlationId: (request as any).correlationId,
      method: request.method,
      url: request.url,
    });
  });

  fastify.addHook(
    "onResponse",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const durationMs = reply.elapsedTime;
      const method = request.method || "unknown";
      const route = request.routeOptions?.url || request.url || "unknown";
      const statusCode = reply.statusCode || 500;

      recordRequestMetrics(method, route, statusCode, durationMs);

      logger.info({
        msg: "Request completed",
        requestId: request.id,
        correlationId: (request as any).correlationId,
        method,
        route,
        statusCode,
        durationMs,
      });
    }
  );
}
