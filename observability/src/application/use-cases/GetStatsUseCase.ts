import pino from "pino";
import { NotFoundError } from "../../domain/index.js";
import { StatsResponseDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

const logger = pino({ name: "GetStatsUseCase" });

export interface GetStatsInput {
  id: string;
  correlationId?: string;
}

export class GetStatsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({
    id,
    correlationId,
  }: GetStatsInput): Promise<StatsResponseDto> {
    logger.info({
      msg: "Fetching URL stats",
      correlationId,
      urlId: id,
    });

    const url = await this.urlRepository.findById(id);
    if (!url) {
      logger.warn({
        msg: "URL not found for stats",
        correlationId,
        urlId: id,
      });
      throw new NotFoundError("URL not found");
    }

    const stats = await this.urlRepository.getClickStats(id);

    logger.info({
      msg: "URL stats fetched successfully",
      correlationId,
      urlId: id,
      clickCount: url.clickCount,
    });

    return {
      id: url.id,
      code: url.code,
      url: url.url,
      click_count: url.clickCount,
      clicks_per_day: stats.clicksPerDay,
      clicks_per_hour: stats.clicksPerHour.map((h) => ({
        hour: h.hour.toISOString(),
        count: h.count,
      })),
    };
  }
}
