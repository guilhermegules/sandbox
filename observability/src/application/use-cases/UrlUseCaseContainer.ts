import { UrlRepository } from "../repositories/IUrlRepository.js";
import {
  CreateUrlUseCase,
  GetUrlByIdUseCase,
  UpdateUrlUseCase,
  DeleteUrlUseCase,
  ListUrlsUseCase,
  RedirectUrlUseCase,
  GetStatsUseCase,
  GetQrCodeUseCase,
} from "./index.js";

export interface UrlUseCases {
  createUrl: CreateUrlUseCase;
  getUrlById: GetUrlByIdUseCase;
  updateUrl: UpdateUrlUseCase;
  deleteUrl: DeleteUrlUseCase;
  listUrls: ListUrlsUseCase;
  redirect: RedirectUrlUseCase;
  getStats: GetStatsUseCase;
  getQrCode: GetQrCodeUseCase;
}

export function createUrlUseCases(
  urlRepository: UrlRepository
): UrlUseCases {
  return {
    createUrl: new CreateUrlUseCase(urlRepository),
    getUrlById: new GetUrlByIdUseCase(urlRepository),
    updateUrl: new UpdateUrlUseCase(urlRepository),
    deleteUrl: new DeleteUrlUseCase(urlRepository),
    listUrls: new ListUrlsUseCase(urlRepository),
    redirect: new RedirectUrlUseCase(urlRepository),
    getStats: new GetStatsUseCase(urlRepository),
    getQrCode: new GetQrCodeUseCase(urlRepository),
  };
}
