import pino from "pino";
import { GoneError, NotFoundError } from "../../domain/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "RedirectUrlUseCase" });

export interface RedirectUrlInput {
  code: string;
  correlationId?: string;
}

export class RedirectUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({ code, correlationId }: RedirectUrlInput): Promise<string> {
    logger.info({
      msg: "Processing URL redirect",
      correlationId,
      code,
    });

    const url = await this.urlRepository.findByCode(code);
    if (!url) {
      logger.warn({
        msg: "URL code not found",
        correlationId,
        code,
      });
      throw new NotFoundError("URL not found");
    }

    if (url.isExpired()) {
      logger.warn({
        msg: "URL expired",
        correlationId,
        code,
        expiresAt: url.expiresAt,
      });
      throw new GoneError("URL expired");
    }

    await this.urlRepository.recordClick(url.id);
    await this.urlRepository.incrementClickCount(url.id);

    logger.info({
      msg: "Redirect successful",
      correlationId,
      code,
      originalUrl: url.url,
    });

    return url.url;
  }
}
