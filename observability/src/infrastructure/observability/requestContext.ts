import type { FastifyContextConfig } from "fastify";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";

const CORRELATION_ID_HEADER = "x-correlation-id";
const REQUEST_ID_HEADER = "x-request-id";

declare module "fastify" {
  interface FastifyRequest {
    id: string;
    correlationId: string;
  }
}

export function registerCorrelationHooks(fastify: FastifyInstance): void {
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    const correlationId =
      request.headers[CORRELATION_ID_HEADER] ||
      request.headers[REQUEST_ID_HEADER] ||
      uuidv4();

    request.correlationId = correlationId as string;
    request.id = correlationId as string;
  });
}

export function getCorrelationId(request: FastifyRequest): string {
  return request.correlationId || request.id;
}

export const requestContext = {
  correlationId: "",
  route: "",
  method: "",
};
