import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostgresUrlRepository } from "./PostgresUrlRepository.js";

const mockPrisma = {
  url: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  click: {
    create: vi.fn(),
  },
  $transaction: vi.fn((fn) => fn(mockPrisma)),
  $queryRaw: vi.fn(),
};

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}));

vi.mock("../database/PrismaClient.js", () => ({
  getPrisma: () => mockPrisma,
}));

describe("PostgresUrlRepository", () => {
  let repository: PostgresUrlRepository;

  const mockUrlRow = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    code: "abc123",
    url: "https://example.com",
    expiresAt: null,
    clickCount: BigInt(5),
    createdAt: new Date("2026-03-29T12:00:00Z"),
    updatedAt: new Date("2026-03-29T12:00:00Z"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new PostgresUrlRepository();
  });

  describe("findById", () => {
    it("should return Url when found", async () => {
      mockPrisma.url.findUnique.mockResolvedValue(mockUrlRow);

      const result = await repository.findById(mockUrlRow.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(mockUrlRow.id);
      expect(result?.code).toBe(mockUrlRow.code);
      expect(result?.url).toBe(mockUrlRow.url);
      expect(result?.clickCount).toBe(5);
    });

    it("should return null when not found", async () => {
      mockPrisma.url.findUnique.mockResolvedValue(null);

      const result = await repository.findById("non-existent-id");

      expect(result).toBeNull();
    });
  });

  describe("findByCode", () => {
    it("should return Url when found", async () => {
      mockPrisma.url.findUnique.mockResolvedValue(mockUrlRow);

      const result = await repository.findByCode("abc123");

      expect(result).not.toBeNull();
      expect(result?.code).toBe("abc123");
    });

    it("should return null when not found", async () => {
      mockPrisma.url.findUnique.mockResolvedValue(null);

      const result = await repository.findByCode("invalid");

      expect(result).toBeNull();
    });
  });

  describe("findByUrl", () => {
    it("should return Url when found with expiration filter", async () => {
      mockPrisma.url.findFirst.mockResolvedValue(mockUrlRow);

      const result = await repository.findByUrl("https://example.com");

      expect(result).not.toBeNull();
      expect(result?.url).toBe("https://example.com");
    });

    it("should return null when not found", async () => {
      mockPrisma.url.findFirst.mockResolvedValue(null);

      const result = await repository.findByUrl("https://notfound.com");

      expect(result).toBeNull();
    });
  });

  describe("findByCodeExists", () => {
    it("should return true when code exists", async () => {
      mockPrisma.url.findUnique.mockResolvedValue({ id: "123" });

      const result = await repository.findByCodeExists("abc123");

      expect(result).toBe(true);
    });

    it("should return false when code does not exist", async () => {
      mockPrisma.url.findUnique.mockResolvedValue(null);

      const result = await repository.findByCodeExists("nonexistent");

      expect(result).toBe(false);
    });
  });

  describe("findAll", () => {
    it("should return urls with total count", async () => {
      mockPrisma.url.findMany.mockResolvedValue([
        mockUrlRow,
        { ...mockUrlRow, id: "222" },
      ]);
      mockPrisma.url.count.mockResolvedValue(2);

      const result = await repository.findAll(1, 10);

      expect(result.urls).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it("should return empty array when no urls", async () => {
      mockPrisma.url.findMany.mockResolvedValue([]);
      mockPrisma.url.count.mockResolvedValue(0);

      const result = await repository.findAll(1, 10);

      expect(result.urls).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("createWithTransaction", () => {
    it("should return null when code already exists", async () => {
      mockPrisma.url.findFirst
        .mockResolvedValueOnce(null) // No existing URL
        .mockResolvedValueOnce({ id: "existing" }); // Code exists

      const result = await repository.createWithTransaction(
        "https://example.com",
        "abc123",
        null
      );

      expect(result).toBeNull();
    });

    it("should return existing URL when URL already exists", async () => {
      mockPrisma.$transaction.mockImplementation(async (fn) => {
        const tx = await fn(mockPrisma);
        return tx;
      });
      mockPrisma.url.findUnique.mockResolvedValue(null);
      mockPrisma.url.findFirst.mockResolvedValue(mockUrlRow);

      const result = await repository.createWithTransaction(
        "https://example.com",
        "abc123",
        null
      );

      expect(result).not.toBeNull();
    });
  });

  describe("update", () => {
    it("should update and return Url", async () => {
      const updatedRow = { ...mockUrlRow, url: "https://new.com" };
      mockPrisma.url.update.mockResolvedValue(updatedRow);

      const result = await repository.update(
        mockUrlRow.id,
        "https://new.com",
        null
      );

      expect(result.url).toBe("https://new.com");
    });
  });

  describe("delete", () => {
    it("should call delete", async () => {
      mockPrisma.url.delete.mockResolvedValue(mockUrlRow);

      await repository.delete(mockUrlRow.id);

      expect(mockPrisma.url.delete).toHaveBeenCalled();
    });
  });

  describe("incrementClickCount", () => {
    it("should call update with increment", async () => {
      mockPrisma.url.update.mockResolvedValue(mockUrlRow);

      await repository.incrementClickCount(mockUrlRow.id);

      expect(mockPrisma.url.update).toHaveBeenCalled();
    });
  });

  describe("recordClick", () => {
    it("should call click create", async () => {
      mockPrisma.click.create.mockResolvedValue({});

      await repository.recordClick(mockUrlRow.id);

      expect(mockPrisma.click.create).toHaveBeenCalled();
    });
  });

  describe("getClickStats", () => {
    it("should return click statistics", async () => {
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([{ date: "2026-03-29", count: BigInt(10) }])
        .mockResolvedValueOnce([
          { hour: new Date("2026-03-29T15:00:00Z"), count: BigInt(5) },
        ]);

      const result = await repository.getClickStats(mockUrlRow.id);

      expect(result.clicksPerDay).toHaveLength(1);
      expect(result.clicksPerDay[0].count).toBe(10);
      expect(result.clicksPerHour).toHaveLength(1);
      expect(result.clicksPerHour[0].count).toBe(5);
    });

    it("should return empty arrays when no clicks", async () => {
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

      const result = await repository.getClickStats(mockUrlRow.id);

      expect(result.clicksPerDay).toHaveLength(0);
      expect(result.clicksPerHour).toHaveLength(0);
    });
  });
});
