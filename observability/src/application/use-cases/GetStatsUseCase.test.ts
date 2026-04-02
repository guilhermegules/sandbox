import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { GetStatsUseCase } from "./GetStatsUseCase.js";
import { Url } from "../../domain/entities/Url.js";
import { NotFoundError } from "../../domain/errors/AppError.js";

const createMockUrl = (overrides = {}): Url => {
  return new Url({
    id: "test-id",
    code: "abc123",
    url: "https://example.com",
    expiresAt: null,
    clickCount: 42,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
};

describe("GetStatsUseCase", () => {
  let useCase: GetStatsUseCase;
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
    useCase = new GetStatsUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return stats for URL", async () => {
      const mockUrl = createMockUrl({ id: "test-id", clickCount: 42 });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.getClickStats).mockResolvedValue({
        clicksPerDay: [{ date: "2026-03-29", count: 15 }],
        clicksPerHour: [{ hour: new Date("2026-03-29T15:00:00Z"), count: 5 }],
      });

      const result = await useCase.execute({ id: "test-id" });

      expect(result.id).toBe("test-id");
      expect(result.code).toBe("abc123");
      expect(result.url).toBe("https://example.com");
      expect(result.click_count).toBe(42);
      expect(result.clicks_per_day).toHaveLength(1);
      expect(result.clicks_per_hour).toHaveLength(1);
    });

    it("should throw NotFoundError when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(useCase.execute({ id: "non-existent" })).rejects.toThrow(NotFoundError);
    });

    it("should format hour in clicks_per_hour as ISO string", async () => {
      const mockUrl = createMockUrl({ id: "test-id" });
      const hourDate = new Date("2026-03-29T15:00:00Z");
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.getClickStats).mockResolvedValue({
        clicksPerDay: [],
        clicksPerHour: [{ hour: hourDate, count: 5 }],
      });

      const result = await useCase.execute({ id: "test-id" });

      expect(result.clicks_per_hour[0].hour).toBe("2026-03-29T15:00:00.000Z");
    });

    it("should return empty arrays when no clicks", async () => {
      const mockUrl = createMockUrl({ id: "test-id", clickCount: 0 });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.getClickStats).mockResolvedValue({
        clicksPerDay: [],
        clicksPerHour: [],
      });

      const result = await useCase.execute({ id: "test-id" });

      expect(result.clicks_per_day).toHaveLength(0);
      expect(result.clicks_per_hour).toHaveLength(0);
    });
  });
});
