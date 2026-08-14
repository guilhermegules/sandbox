import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { GetUrlByIdUseCase } from "./GetUrlByIdUseCase.js";
import { Url } from "../../domain/entities/Url.js";
import { NotFoundError } from "../../domain/errors/AppError.js";

const createMockUrl = (overrides = {}): Url => {
  return new Url({
    id: "test-id",
    code: "abc123",
    url: "https://example.com",
    expiresAt: null,
    clickCount: 5,
    createdAt: new Date("2026-03-29T12:00:00Z"),
    updatedAt: new Date("2026-03-29T12:00:00Z"),
    ...overrides,
  });
};

describe("GetUrlByIdUseCase", () => {
  let useCase: GetUrlByIdUseCase;
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
    useCase = new GetUrlByIdUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return URL response when found", async () => {
      const mockUrl = createMockUrl({ id: "test-id" });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      const result = await useCase.execute({ id: "test-id", baseUrl: "http://localhost:3000" });

      expect(result.id).toBe("test-id");
      expect(result.short_url).toBe("http://localhost:3000/abc123");
    });

    it("should throw NotFoundError when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(
        useCase.execute({ id: "non-existent", baseUrl: "http://localhost:3000" })
      ).rejects.toThrow(NotFoundError);
    });

    it("should include all URL properties in response", async () => {
      const mockUrl = createMockUrl({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        clickCount: 10,
      });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      const result = await useCase.execute({ id: "test-id", baseUrl: "http://localhost:3000" });

      expect(result.code).toBe("abc123");
      expect(result.url).toBe("https://example.com");
      expect(result.click_count).toBe(10);
    });

    it("should format expires_at as ISO string when present", async () => {
      const expiresAt = new Date("2026-12-31T23:59:59Z");
      const mockUrl = createMockUrl({ expiresAt });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      const result = await useCase.execute({ id: "test-id", baseUrl: "http://localhost:3000" });

      expect(result.expires_at).toBe("2026-12-31T23:59:59.000Z");
    });

    it("should return null for expires_at when not set", async () => {
      const mockUrl = createMockUrl({ expiresAt: null });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      const result = await useCase.execute({ id: "test-id", baseUrl: "http://localhost:3000" });

      expect(result.expires_at).toBeNull();
    });
  });
});
