import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  CreateUrlSchema,
  PaginationSchema,
  UpdateUrlSchema,
} from "../../application/dtos/index.js";
import { UrlUseCases } from "../../application/use-cases/UrlUseCaseContainer.js";
import { AppError, BadRequestError } from "../../domain/errors/AppError.js";

export class UrlController {
  constructor(
    private readonly urlUseCases: UrlUseCases,
    private readonly baseUrl: string,
    private readonly fastify: FastifyInstance
  ) {
    this.registerRoutes();
  }

  private getCorrelationId(request: FastifyRequest): string {
    return (request as any).correlationId || request.id;
  }

  private async handleError(
    error: unknown,
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const correlationId = this.getCorrelationId(request);

    if (error instanceof AppError) {
      this.fastify.log.error({
        err: error,
        requestId: request.id,
        correlationId,
        route: request.url,
        method: request.method,
        statusCode: error.statusCode,
        msg: "AppError handled",
      });
      reply.status(error.statusCode).send({ error: error.message });
      return;
    }
    this.fastify.log.error({
      err: error,
      requestId: request.id,
      correlationId,
      route: request.url,
      method: request.method,
      msg: "Unhandled error",
    });
    reply.status(500).send({ error: "Internal Server Error" });
  }

  private registerRoutes(): void {
    this.fastify.post(
      "/urls",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const correlationId = this.getCorrelationId(request);

        try {
          const parsed = CreateUrlSchema.safeParse(request.body);
          if (!parsed.success) {
            const message = parsed.error.issues
              .map((e) => e.message)
              .join(", ");
            throw new BadRequestError(message);
          }

          const result = await this.urlUseCases.createUrl.execute({
            dto: parsed.data,
            correlationId,
          });

          const statusCode = result.isExisting ? 200 : 201;
          const response = await this.urlUseCases.getUrlById.execute({
            id: result.url.id,
            baseUrl: this.baseUrl,
            correlationId,
          });
          reply.status(statusCode).send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.get(
      "/urls/:id",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { id } = request.params;

        try {
          const response = await this.urlUseCases.getUrlById.execute({
            id,
            baseUrl: this.baseUrl,
            correlationId,
          });
          reply.send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.patch(
      "/urls/:id",
      async (
        request: FastifyRequest<{ Params: { id: string }; Body: unknown }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { id } = request.params;

        try {
          const parsed = UpdateUrlSchema.safeParse(request.body);
          if (!parsed.success) {
            const message = parsed.error.issues
              .map((e) => e.message)
              .join(", ");
            throw new BadRequestError(message);
          }

          const response = await this.urlUseCases.updateUrl.execute({
            id,
            dto: parsed.data,
            baseUrl: this.baseUrl,
            correlationId,
          });
          reply.send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.delete(
      "/urls/:id",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { id } = request.params;

        try {
          await this.urlUseCases.deleteUrl.execute({ id, correlationId });
          reply.status(204).send();
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.get(
      "/urls",
      async (
        request: FastifyRequest<{
          Querystring: { page?: string; per_page?: string };
        }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);

        try {
          const parsed = PaginationSchema.safeParse(request.query);
          if (!parsed.success) {
            const message = parsed.error.issues
              .map((e) => e.message)
              .join(", ");
            throw new BadRequestError(message);
          }

          const response = await this.urlUseCases.listUrls.execute({
            page: parsed.data.page,
            perPage: parsed.data.per_page,
            baseUrl: this.baseUrl,
            correlationId,
          });
          reply.send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.get(
      "/:code",
      async (
        request: FastifyRequest<{ Params: { code: string } }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { code } = request.params;

        try {
          const redirectUrl = await this.urlUseCases.redirect.execute({
            code,
            correlationId,
          });
          reply.redirect(redirectUrl, 301);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.get(
      "/urls/:id/stats",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { id } = request.params;

        try {
          const response = await this.urlUseCases.getStats.execute({
            id,
            correlationId,
          });
          reply.send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );

    this.fastify.get(
      "/urls/:id/qr",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
      ) => {
        const correlationId = this.getCorrelationId(request);
        const { id } = request.params;

        try {
          const response = await this.urlUseCases.getQrCode.execute({
            id,
            baseUrl: this.baseUrl,
          });
          reply.send(response);
        } catch (error) {
          await this.handleError(error, request, reply);
        }
      }
    );
  }
}
