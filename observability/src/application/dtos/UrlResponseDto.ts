import { Url } from "../../domain/entities/Url.js";

export interface UrlResponseDto {
  id: string;
  code: string;
  url: string;
  short_url: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  click_count: number;
}

export interface UrlListResponseDto {
  data: UrlResponseDto[];
  meta: {
    page: number;
    per_page: number;
    total: number;
  };
}

export interface StatsResponseDto {
  id: string;
  code: string;
  url: string;
  click_count: number;
  clicks_per_day: Array<{ date: string; count: number }>;
  clicks_per_hour: Array<{ hour: string; count: number }>;
}

export interface QrCodeResponseDto {
  qr_code: string;
}

export function toUrlResponse(url: Url, baseUrl: string): UrlResponseDto {
  return {
    id: url.id,
    code: url.code,
    url: url.url,
    short_url: `${baseUrl}/${url.code}`,
    expires_at: url.expiresAt instanceof Date ? url.expiresAt.toISOString() : null,
    created_at: url.createdAt instanceof Date ? url.createdAt.toISOString() : "",
    updated_at: url.updatedAt instanceof Date ? url.updatedAt.toISOString() : "",
    click_count: url.clickCount,
  };
}
