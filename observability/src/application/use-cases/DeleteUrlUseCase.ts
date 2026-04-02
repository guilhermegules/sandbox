import pino from "pino";
import { NotFoundError } from "../../domain/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "DeleteUrlUseCase" });

export interface DeleteUrlInput {
  id: string;
  correlationId?: string;
}

export class DeleteUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({ id, correlationId }: DeleteUrlInput): Promise<void> {
    logger.info({
      msg: "Deleting URL",
      correlationId,
      urlId: id,
    });

    const existing = await this.urlRepository.findById(id);
    if (!existing) {
      logger.warn({
        msg: "URL not found for deletion",
        correlationId,
        urlId: id,
      });
      throw new NotFoundError("URL not found");
    }

    await this.urlRepository.delete(id);

    logger.info({
      msg: "URL deleted successfully",
      correlationId,
      urlId: id,
    });
  }
}
