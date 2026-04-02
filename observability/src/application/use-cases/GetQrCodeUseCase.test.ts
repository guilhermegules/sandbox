import { beforeEach, describe, expect, it, vi } from "vitest";
import { Url } from "../../domain/entities/Url.js";
import { NotFoundError } from "../../domain/errors/AppError.js";
import type { UrlRepository } from "../repositories/IUrlRepository.js";
import { GetQrCodeUseCase } from "./GetQrCodeUseCase.js";

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi
      .fn()
      .mockResolvedValue(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      ),
  },
}));

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

describe("GetQrCodeUseCase", () => {
  let useCase: GetQrCodeUseCase;
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
    useCase = new GetQrCodeUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return QR code for URL", async () => {
      const mockUrl = createMockUrl({ code: "abc123" });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      const result = await useCase.execute({
        id: "test-id",
        baseUrl: "http://localhost:3000",
      });

      expect(result.qr_code).toBeDefined();
      expect(result.qr_code).toMatch(/^[A-Za-z0-9+/=]+$/);
    });

    it("should throw NotFoundError when URL not found", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(
        useCase.execute({
          id: "non-existent",
          baseUrl: "http://localhost:3000",
        })
      ).rejects.toThrow(NotFoundError);
    });

    it("should generate QR code with correct short URL", async () => {
      const mockUrl = createMockUrl({ code: "abc123" });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      await useCase.execute({
        id: "test-id",
        baseUrl: "http://localhost:3000",
      });

      const QRCode = (await import("qrcode")).default;
      expect(QRCode.toDataURL).toHaveBeenCalledWith(
        "http://localhost:3000/abc123"
      );
    });

    it("should include custom code in short URL", async () => {
      const mockUrl = createMockUrl({ code: "custom" });
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUrl);

      await useCase.execute({
        id: "test-id",
        baseUrl: "http://localhost:3000",
      });

      const QRCode = (await import("qrcode")).default;
      expect(QRCode.toDataURL).toHaveBeenCalledWith(
        "http://localhost:3000/custom"
      );
    });
  });
});
