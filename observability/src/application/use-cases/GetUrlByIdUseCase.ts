import pino from "pino";
import { NotFoundError, Url } from "../../domain/index.js";
import { toUrlResponse, UrlResponseDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "GetUrlByIdUseCase" });

export interface GetUrlByIdInput {
  id: string;
  baseUrl: string;
  correlationId?: string;
}

export class GetUrlByIdUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({
    id,
    baseUrl,
    correlationId,
  }: GetUrlByIdInput): Promise<UrlResponseDto> {
    logger.info({
      msg: "Fetching URL by ID",
      correlationId,
      urlId: id,
    });

    const url = await this.urlRepository.findById(id);
    if (!url) {
      logger.warn({
        msg: "URL not found",
        correlationId,
        urlId: id,
      });
      throw new NotFoundError("URL not found");
    }

    logger.info({
      msg: "URL fetched successfully",
      correlationId,
      urlId: id,
    });

    return toUrlResponse(url, baseUrl);
  }
}
