import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { DeleteUrlUseCase } from "./DeleteUrlUseCase.js";
import { Url } from "../../domain/entities/Url.js";
import { NotFoundError } from "../../domain/errors/AppError.js";

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

describe("DeleteUrlUseCase", () => {
  let useCase: DeleteUrlUseCase;
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
    useCase = new DeleteUrlUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should delete URL successfully", async () => {
      const mockUrl = createMockUrl({ id: "test-id" });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);
      vi.mocked(mockRepository.delete).mockResolvedValue();

      await useCase.execute({ id: "test-id" });

      expect(mockRepository.delete).toHaveBeenCalledWith("test-id");
    });

    it("should throw NotFoundError when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(useCase.execute({ id: "non-existent" })).rejects.toThrow(NotFoundError);
    });

    it("should not call delete when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(useCase.execute({ id: "non-existent" })).rejects.toThrow(NotFoundError);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
