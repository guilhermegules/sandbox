import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { httpErrorsTotal } from "./metrics.js";

export function registerErrorHandlers(fastify: FastifyInstance): void {
  const logger = fastify.log;

  fastify.setErrorHandler(
    async (
      error: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      const statusCode = error.statusCode || 500;
      const method = request.method || "unknown";
      const route = request.routeOptions?.url || request.url || "unknown";

      httpErrorsTotal.inc({
        method,
        route,
        status_code: statusCode.toString(),
      });

      logger.error({
        err: error,
        requestId: request.id,
        correlationId: (request as any).correlationId,
        route,
        method,
        statusCode,
      });

      if (error.validation) {
        reply.status(400).send({
          error: "Validation Error",
          message: error.message,
          requestId: request.id,
        });
        return;
      }

      reply.status(statusCode).send({
        error: statusCode < 500 ? "Request Error" : "Internal Server Error",
        message:
          statusCode < 500 ? error.message : "An unexpected error occurred",
        requestId: request.id,
      });
    }
  );

  process.on("unhandledRejection", (reason) => {
    logger.error({
      err: reason,
      type: "unhandledRejection",
    });
  });

  process.on("uncaughtException", (err) => {
    logger.error({
      err,
      type: "uncaughtException",
    });
    process.exit(1);
  });
}
