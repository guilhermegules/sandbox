import pino from "pino";
import { BadRequestError, ConflictError, Url } from "../../domain/index.js";
import { CreateUrlDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";
import { customCodeValidator } from "../validations/custom-code-validator.js";
import { isPastDate } from "../validations/is-past-date.js";
import { urlValidator } from "../validations/url-validator.js";
import { generateCode } from "./GenerateCode.js";

const logger = pino({ name: "CreateUrlUseCase" });

export interface CreateUrlInput {
  dto: CreateUrlDto;
  correlationId?: string;
}

export interface CreateUrlOutput {
  url: Url;
  isExisting: boolean;
}

export class CreateUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) { }

  async execute({
    dto,
    correlationId,
  }: CreateUrlInput): Promise<CreateUrlOutput> {
    logger.info({
      msg: "Starting URL creation",
      correlationId,
      url: dto.url,
      customCode: dto.custom_code,
    });

    const expiresAt = dto.expires_at ? new Date(dto.expires_at) : null;
    if (expiresAt && expiresAt <= new Date()) {
      logger.warn({
        msg: "Invalid expiration date",
        correlationId,
        expiresAt: dto.expires_at,
      });
      throw new BadRequestError("expires_at must be in the future");
    }

    const isUrlValid = urlValidator(dto.url);
    if (!isUrlValid) {
      logger.warn({
        msg: "Invalid URL format",
        correlationId,
        url: dto.url,
      });
      throw new BadRequestError("Invalid URL");
    }

    const isCustomCodeValid = dto.custom_code
      ? customCodeValidator(dto.custom_code)
      : true;
    if (!isCustomCodeValid) {
      logger.warn({
        msg: "Invalid custom code format",
        correlationId,
        customCode: dto.custom_code,
      });
      throw new BadRequestError("Invalid custom code");
    }

    const isDateInThePast = dto.expires_at
      ? isPastDate(new Date(dto.expires_at))
      : false;
    if (isDateInThePast) {
      logger.warn({
        msg: "Expiration date is in the past",
        correlationId,
        expiresAt: dto.expires_at,
      });
      throw new BadRequestError("Expiration date is in the past");
    }

    const code = dto.custom_code || generateCode();
    logger.debug({
      msg: "Creating URL in repository",
      correlationId,
      code,
    });

    const response = await this.urlRepository.createWithTransaction(
      dto.url,
      code,
      expiresAt
    );

    if (!response) {
      logger.warn({
        msg: "Custom code already exists",
        correlationId,
        code,
      });
      throw new ConflictError("custom_code already exists");
    }

    logger.info({
      msg: "URL created successfully",
      correlationId,
      urlId: response.url.id,
      code: response.url.code,
      isExisting: response.isExisting,
    });

    return response;
  }
}
