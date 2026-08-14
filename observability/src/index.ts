import cors from "@fastify/cors";
import Fastify from "fastify";
import { createUrlUseCases } from "./application/use-cases/UrlUseCaseContainer.js";
import { closePrisma } from "./infrastructure/database/PrismaClient.js";
import {
  createLogger,
  healthCheckRoutes,
  initTracing,
  registerCorrelationHooks,
  registerErrorHandlers,
  registerRequestHooks,
  startPerformanceMonitoring,
} from "./infrastructure/observability/index.js";
import { PostgresUrlRepository } from "./infrastructure/repositories/PostgresUrlRepository.js";
import { UrlController } from "./presentation/controllers/UrlController.js";

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";
const BASE_URL = `http://${HOST}:${PORT}`;

async function main() {
  if (process.env.OTEL_ENABLED === "true") {
    initTracing();
  }

  const logger = createLogger();

  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
    genReqId: () => {
      return crypto.randomUUID();
    },
  });

  await fastify.register(cors, { origin: true });

  registerCorrelationHooks(fastify);
  registerRequestHooks(fastify);
  registerErrorHandlers(fastify);
  await healthCheckRoutes(fastify);

  const urlRepository = new PostgresUrlRepository();
  const urlUseCases = createUrlUseCases(urlRepository);

  new UrlController(urlUseCases, BASE_URL, fastify);

  startPerformanceMonitoring(10000);

  const shutdown = async () => {
    logger.info({ msg: "Shutting down server" });
    await fastify.close();
    await closePrisma();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await fastify.listen({ port: PORT, host: HOST });
  logger.info({ msg: "Server started", host: HOST, port: PORT });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
