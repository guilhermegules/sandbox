import { Url, ClickStats } from "../../domain/entities/Url.js";

export type CreateWithTransactionResponse = {
  url: Url;
  isExisting: boolean;
}

export interface UrlRepository {
  findById(id: string): Promise<Url | null>;
  findByCode(code: string): Promise<Url | null>;
  findByUrl(url: string): Promise<Url | null>;
  findByCodeExists(code: string): Promise<boolean>;
  findAll(
    page: number,
    perPage: number
  ): Promise<{ urls: Url[]; total: number }>;
  createWithTransaction(
    url: string,
    code: string,
    expiresAt: Date | null
  ): Promise<CreateWithTransactionResponse | null>;
  update(id: string, url: string | null, expiresAt: Date | null): Promise<Url>;
  delete(id: string): Promise<void>;
  incrementClickCount(id: string): Promise<void>;
  recordClick(urlId: string): Promise<void>;
  getClickStats(id: string): Promise<ClickStats>;
}
