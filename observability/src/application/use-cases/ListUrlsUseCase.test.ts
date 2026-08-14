import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { ListUrlsUseCase } from "./ListUrlsUseCase.js";
import { Url } from "../../domain/entities/Url.js";

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

describe("ListUrlsUseCase", () => {
  let useCase: ListUrlsUseCase;
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
    useCase = new ListUrlsUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return paginated list of URLs", async () => {
      const mockUrls = [
        createMockUrl({ id: "1" }),
        createMockUrl({ id: "2" }),
      ];
      vi.mocked(mockRepository.findAll).mockResolvedValue({
        urls: mockUrls,
        total: 10,
      });

      const result = await useCase.execute({
        page: 1,
        perPage: 10,
        baseUrl: "http://localhost:3000",
      });

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(10);
      expect(result.meta.page).toBe(1);
      expect(result.meta.per_page).toBe(10);
    });

    it("should return empty array when no URLs", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue({
        urls: [],
        total: 0,
      });

      const result = await useCase.execute({
        page: 1,
        perPage: 10,
        baseUrl: "http://localhost:3000",
      });

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });

    it("should map URLs to response format with short_url", async () => {
      const mockUrls = [createMockUrl({ id: "1", code: "abc123" })];
      vi.mocked(mockRepository.findAll).mockResolvedValue({
        urls: mockUrls,
        total: 1,
      });

      const result = await useCase.execute({
        page: 1,
        perPage: 10,
        baseUrl: "http://localhost:3000",
      });

      expect(result.data[0].short_url).toBe("http://localhost:3000/abc123");
    });

    it("should pass pagination params to repository", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue({
        urls: [],
        total: 0,
      });

      await useCase.execute({
        page: 2,
        perPage: 20,
        baseUrl: "http://localhost:3000",
      });

      expect(mockRepository.findAll).toHaveBeenCalledWith(2, 20);
    });
  });
});
