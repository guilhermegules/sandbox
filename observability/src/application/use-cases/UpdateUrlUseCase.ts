import pino from "pino";
import { BadRequestError, NotFoundError } from "../../domain/index.js";
import { toUrlResponse, UpdateUrlDto, UrlResponseDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "UpdateUrlUseCase" });

export interface UpdateUrlInput {
  id: string;
  dto: UpdateUrlDto;
  baseUrl: string;
  correlationId?: string;
}

export class UpdateUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({
    id,
    dto,
    baseUrl,
    correlationId,
  }: UpdateUrlInput): Promise<UrlResponseDto> {
    logger.info({
      msg: "Updating URL",
      correlationId,
      urlId: id,
      updates: dto,
    });

    const existing = await this.urlRepository.findById(id);
    if (!existing) {
      logger.warn({
        msg: "URL not found for update",
        correlationId,
        urlId: id,
      });
      throw new NotFoundError("URL not found");
    }

    let expiresAt: Date | null = existing.expiresAt;
    if (dto.expires_at) {
      expiresAt = new Date(dto.expires_at);
      if (expiresAt <= new Date()) {
        logger.warn({
          msg: "Invalid expiration date",
          correlationId,
          expiresAt: dto.expires_at,
        });
        throw new BadRequestError("expires_at must be in the future");
      }
    }

    const updated = await this.urlRepository.update(
      id,
      dto.url ?? null,
      expiresAt
    );

    logger.info({
      msg: "URL updated successfully",
      correlationId,
      urlId: id,
    });

    return toUrlResponse(updated, baseUrl);
  }
}
