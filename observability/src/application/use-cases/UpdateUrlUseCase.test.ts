import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { UpdateUrlUseCase } from "./UpdateUrlUseCase.js";
import { Url } from "../../domain/entities/Url.js";
import { BadRequestError, NotFoundError } from "../../domain/errors/AppError.js";

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

describe("UpdateUrlUseCase", () => {
  let useCase: UpdateUrlUseCase;
  let mockRepository: UrlRepository;

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      findByCode: vi.fn(),
      findByUrl: vi.fn(),
      findByCodeExists: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
      createWithTransaction: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      incrementClickCount: vi.fn(),
      recordClick: vi.fn(),
      getClickStats: vi.fn(),
    };
    useCase = new UpdateUrlUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should update URL successfully", async () => {
      const existingUrl = createMockUrl({ id: "test-id" });
      const updatedUrl = createMockUrl({ id: "test-id", url: "https://new.example.com" });
      vi.mocked(mockRepository.findById).mockResolvedValue(existingUrl);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedUrl);

      const result = await useCase.execute({
        id: "test-id",
        dto: { url: "https://new.example.com" },
        baseUrl: "http://localhost:3000",
      });

      expect(result.url).toBe("https://new.example.com");
      expect(mockRepository.update).toHaveBeenCalledWith("test-id", "https://new.example.com", null);
    });

    it("should throw NotFoundError when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(
        useCase.execute({
          id: "non-existent",
          dto: { url: "https://new.com" },
          baseUrl: "http://localhost:3000",
        })
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw BadRequestError if new expires_at is in the past", async () => {
      const existingUrl = createMockUrl({ id: "test-id" });
      vi.mocked(mockRepository.findById).mockResolvedValue(existingUrl);
      const pastDate = new Date(Date.now() - 86400000).toISOString();

      await expect(
        useCase.execute({
          id: "test-id",
          dto: { expires_at: pastDate },
          baseUrl: "http://localhost:3000",
        })
      ).rejects.toThrow(BadRequestError);
    });

    it("should preserve existing expiresAt when not provided in update", async () => {
      const existingExpiresAt = new Date("2026-12-31T23:59:59Z");
      const existingUrl = createMockUrl({ id: "test-id", expiresAt: existingExpiresAt });
      const updatedUrl = createMockUrl({ id: "test-id", expiresAt: existingExpiresAt });
      vi.mocked(mockRepository.findById).mockResolvedValue(existingUrl);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedUrl);

      await useCase.execute({
        id: "test-id",
        dto: { url: "https://new.com" },
        baseUrl: "http://localhost:3000",
      });

      expect(mockRepository.update).toHaveBeenCalledWith("test-id", "https://new.com", existingExpiresAt);
    });

    it("should update expiresAt when provided", async () => {
      const existingUrl = createMockUrl({ id: "test-id", expiresAt: null });
      const newExpiresAt = new Date("2026-12-31T23:59:59Z");
      const updatedUrl = createMockUrl({ id: "test-id", expiresAt: newExpiresAt });
      vi.mocked(mockRepository.findById).mockResolvedValue(existingUrl);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedUrl);

      await useCase.execute({
        id: "test-id",
        dto: { expires_at: "2026-12-31T23:59:59Z" },
        baseUrl: "http://localhost:3000",
      });

      expect(mockRepository.update).toHaveBeenCalled();
    });
  });
});
