import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { RedirectUrlUseCase } from "./RedirectUrlUseCase.js";
import { Url } from "../../domain/entities/Url.js";
import { GoneError, NotFoundError } from "../../domain/errors/AppError.js";

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

describe("RedirectUrlUseCase", () => {
  let useCase: RedirectUrlUseCase;
  let mockRepository: UrlRepository;

  beforeEach(() => {
    mockRepository = {
      findByCode: vi.fn(),
      findById: vi.fn(),
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
    useCase = new RedirectUrlUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return redirect URL and record click", async () => {
      const mockUrl = createMockUrl({ code: "abc123" });
      vi.mocked(mockRepository.findByCode).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.recordClick).mockResolvedValue();
      vi.mocked(mockRepository.incrementClickCount).mockResolvedValue();

      const result = await useCase.execute({ code: "abc123" });

      expect(result).toBe("https://example.com");
      expect(mockRepository.recordClick).toHaveBeenCalledWith("test-id");
      expect(mockRepository.incrementClickCount).toHaveBeenCalledWith("test-id");
    });

    it("should throw NotFoundError when code not found", async () => {
      vi.mocked(mockRepository.findByCode).mockResolvedValue(null);

      await expect(useCase.execute({ code: "invalid" })).rejects.toThrow(NotFoundError);
    });

    it("should throw GoneError when URL is expired", async () => {
      const expiredUrl = createMockUrl({
        expiresAt: new Date(Date.now() - 86400000),
      });
      vi.mocked(mockRepository.findByCode).mockResolvedValue(expiredUrl);

      await expect(useCase.execute({ code: "abc123" })).rejects.toThrow(GoneError);
    });

    it("should not throw when URL has no expiration", async () => {
      const mockUrl = createMockUrl({ expiresAt: null });
      vi.mocked(mockRepository.findByCode).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.recordClick).mockResolvedValue();
      vi.mocked(mockRepository.incrementClickCount).mockResolvedValue();

      const result = await useCase.execute({ code: "abc123" });

      expect(result).toBe("https://example.com");
    });

    it("should not throw when URL expires in the future", async () => {
      const mockUrl = createMockUrl({
        expiresAt: new Date(Date.now() + 86400000),
      });
      vi.mocked(mockRepository.findByCode).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.recordClick).mockResolvedValue();
      vi.mocked(mockRepository.incrementClickCount).mockResolvedValue();

      const result = await useCase.execute({ code: "abc123" });

      expect(result).toBe("https://example.com");
    });

    it("should throw GoneError when expiresAt is exactly now", async () => {
      const expiredUrl = createMockUrl({
        expiresAt: new Date(),
      });
      vi.mocked(mockRepository.findByCode).mockResolvedValue(expiredUrl);

      await expect(useCase.execute({ code: "abc123" })).rejects.toThrow(GoneError);
    });
  });
});
