import { describe, expect, it } from "vitest";
import { Url } from "./domain/entities/Url.js";

describe("Url", () => {
  describe("constructor", () => {
    it("should create a Url with all properties", () => {
      const now = new Date();
      const url = new Url({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        expiresAt: null,
        clickCount: 5,
        createdAt: now,
        updatedAt: now,
      });

      expect(url.id).toBe("test-id");
      expect(url.code).toBe("abc123");
      expect(url.url).toBe("https://example.com");
      expect(url.expiresAt).toBeNull();
      expect(url.clickCount).toBe(5);
      expect(url.createdAt).toBe(now);
      expect(url.updatedAt).toBe(now);
    });

    it("should set expiresAt when provided", () => {
      const expiresAt = new Date();
      const url = new Url({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        expiresAt,
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(url.expiresAt).toBe(expiresAt);
    });
  });

  describe("isExpired", () => {
    it("should return false when expiresAt is null", () => {
      const url = new Url({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        expiresAt: null,
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(url.isExpired()).toBe(false);
    });

    it("should return false when expiresAt is in the future", () => {
      const url = new Url({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        expiresAt: new Date(Date.now() + 86400000),
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(url.isExpired()).toBe(false);
    });

    it("should return true when expiresAt is in the past", () => {
      const url = new Url({
        id: "test-id",
        code: "abc123",
        url: "https://example.com",
        expiresAt: new Date(Date.now() - 86400000),
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(url.isExpired()).toBe(true);
    });
  });
});
