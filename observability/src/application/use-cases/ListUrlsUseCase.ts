import pino from "pino";
import { toUrlResponse, UrlListResponseDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "ListUrlsUseCase" });

export interface ListUrlsInput {
  page: number;
  perPage: number;
  baseUrl: string;
  correlationId?: string;
}

export class ListUrlsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({
    page,
    perPage,
    baseUrl,
    correlationId,
  }: ListUrlsInput): Promise<UrlListResponseDto> {
    logger.info({
      msg: "Listing URLs",
      correlationId,
      page,
      perPage,
    });

    const { urls, total } = await this.urlRepository.findAll(page, perPage);

    logger.info({
      msg: "URLs listed successfully",
      correlationId,
      page,
      perPage,
      totalCount: total,
    });

    return {
      data: urls.map((url) => toUrlResponse(url, baseUrl)),
      meta: { page, per_page: perPage, total },
    };
  }
}
