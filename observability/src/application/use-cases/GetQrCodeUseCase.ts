import QRCode from "qrcode";
import { NotFoundError } from "../../domain/index.js";
import { QrCodeResponseDto } from "../dtos/index.js";
import { UrlRepository } from "../repositories/IUrlRepository.js";

export interface GetQrCodeInput {
  id: string;
  baseUrl: string;
}

export class GetQrCodeUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({ id, baseUrl }: GetQrCodeInput): Promise<QrCodeResponseDto> {
    const url = await this.urlRepository.findById(id);
    if (!url) {
      throw new NotFoundError("URL not found");
    }

    const shortUrl = `${baseUrl}/${url.code}`;
    const dataUrl = await QRCode.toDataURL(shortUrl);
    const qrCode = dataUrl.replace("data:image/png;base64,", "");
    return { qr_code: qrCode };
  }
}
