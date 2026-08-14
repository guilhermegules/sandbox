import { beforeEach, describe, expect, it, vi } from "vitest";
import { Url } from "../../domain/entities/Url.js";
import {
  BadRequestError,
  ConflictError,
} from "../../domain/errors/AppError.js";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { CreateUrlUseCase } from "./CreateUrlUseCase.js";

const createMockUrl = (overrides = {}): Url => {
  return new Url({
    id: "test-id",
    code: "abc123",
    url: "https://example.com",
    expiresAt: null,
    clickCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
};

describe("CreateUrlUseCase", () => {
  let useCase: CreateUrlUseCase;
  let mockRepository: UrlRepository;

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      findByCode: vi.fn(),
      findByUrl: vi.fn(),
      findByCodeExists: vi.fn(),
      findAll: vi.fn(),
      createWithTransaction: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      incrementClickCount: vi.fn(),
      recordClick: vi.fn(),
      getClickStats: vi.fn(),
    };
    useCase = new CreateUrlUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should create a new URL with generated code", async () => {
      const mockUrl = createMockUrl();
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue({
        url: mockUrl,
        isExisting: false,
      });

      const result = await useCase.execute({
        dto: { url: "https://example.com" },
      });

      expect(result.isExisting).toBe(false);
      expect(result.url).toEqual(mockUrl);
      expect(mockRepository.createWithTransaction).toHaveBeenCalled();
    });

    it("should return existing URL if URL already exists", async () => {
      const existingUrl = createMockUrl({ url: "https://existing.com" });
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue({
        url: existingUrl,
        isExisting: true,
      });

      const result = await useCase.execute({
        dto: { url: "https://different.com" },
      });

      expect(result.isExisting).toBe(true);
      expect(result.url).toEqual(existingUrl);
    });

    it("should use custom code when provided", async () => {
      const mockUrl = createMockUrl({ code: "custom1" });
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue({
        url: mockUrl,
        isExisting: false,
      });

      const result = await useCase.execute({
        dto: { url: "https://example.com", custom_code: "custom1" },
      });

      expect(result.url.code).toBe("custom1");
    });

    it("should throw ConflictError if custom code already exists", async () => {
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue(null);

      await expect(
        useCase.execute({
          dto: { url: "https://example.com", custom_code: "taken" },
        })
      ).rejects.toThrow(ConflictError);
    });

    it("should throw BadRequestError if expires_at is in the past", async () => {
      const pastDate = new Date(Date.now() - 86400000).toISOString();

      await expect(
        useCase.execute({
          dto: { url: "https://example.com", expires_at: pastDate },
        })
      ).rejects.toThrow(BadRequestError);
    });

    it("should throw BadRequestError if expires_at is now", async () => {
      const now = new Date().toISOString();

      await expect(
        useCase.execute({
          dto: { url: "https://example.com", expires_at: now },
        })
      ).rejects.toThrow(BadRequestError);
    });

    it("should allow future expires_at", async () => {
      const mockUrl = createMockUrl();
      const futureDate = new Date(Date.now() + 86400000).toISOString();
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue({
        url: mockUrl,
        isExisting: false,
      });

      const result = await useCase.execute({
        dto: { url: "https://example.com", expires_at: futureDate },
      });

      expect(result.url).toEqual(mockUrl);
    });

    it("should set isExisting to true when custom_code differs from returned code", async () => {
      const mockUrl = createMockUrl({ code: "xyz789" });
      vi.mocked(mockRepository.createWithTransaction).mockResolvedValue({
        url: mockUrl,
        isExisting: true,
      });

      const result = await useCase.execute({
        dto: { url: "https://example.com", custom_code: "custom1" },
      });

      expect(result.isExisting).toBe(true);
    });
  });
});
