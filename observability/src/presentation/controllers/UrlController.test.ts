import { beforeEach, describe, expect, it, vi } from "vitest";
import { UrlUseCases } from "../../application/use-cases/UrlUseCaseContainer.js";
import {
  BadRequestError,
  ConflictError,
  GoneError,
  NotFoundError,
} from "../../domain/errors/AppError.js";
import { UrlController } from "./UrlController.js";

describe("UrlController", () => {
  let mockUrlUseCases: UrlUseCases;
  let mockFastify: ReturnType<typeof vi.fn>;
  let routes: Record<string, { handler: Function; method: string }[]>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUrlUseCases = {
      createUrl: {
        execute: vi.fn(),
      } as any,
      getUrlById: {
        execute: vi.fn(),
      } as any,
      updateUrl: {
        execute: vi.fn(),
      } as any,
      deleteUrl: {
        execute: vi.fn(),
      } as any,
      listUrls: {
        execute: vi.fn(),
      } as any,
      redirect: {
        execute: vi.fn(),
      } as any,
      getStats: {
        execute: vi.fn(),
      } as any,
      getQrCode: {
        execute: vi.fn(),
      } as any,
    };

    routes = {};

    mockFastify = {
      get: vi.fn((path: string, handler: Function) => {
        if (!routes.GET) routes.GET = [];
        routes.GET.push({ handler, method: "GET" });
        return mockFastify;
      }),
      post: vi.fn((path: string, handler: Function) => {
        if (!routes.POST) routes.POST = [];
        routes.POST.push({ handler, method: "POST" });
        return mockFastify;
      }),
      patch: vi.fn((path: string, handler: Function) => {
        if (!routes.PATCH) routes.PATCH = [];
        routes.PATCH.push({ handler, method: "PATCH" });
        return mockFastify;
      }),
      delete: vi.fn((path: string, handler: Function) => {
        if (!routes.DELETE) routes.DELETE = [];
        routes.DELETE.push({ handler, method: "DELETE" });
        return mockFastify;
      }),
      log: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
      routes,
    } as unknown as ReturnType<typeof vi.fn>;

    new UrlController(
      mockUrlUseCases,
      "http://localhost:3000",
      mockFastify as any
    );
  });

  describe("Create URL", () => {
    it("should register POST /urls route", () => {
      expect(mockFastify.post).toHaveBeenCalledWith(
        "/urls",
        expect.any(Function)
      );
    });
  });

  describe("Get URL", () => {
    it("should register GET /urls/:id route", () => {
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/urls/:id",
        expect.any(Function)
      );
    });
  });

  describe("Update URL", () => {
    it("should register PATCH /urls/:id route", () => {
      expect(mockFastify.patch).toHaveBeenCalledWith(
        "/urls/:id",
        expect.any(Function)
      );
    });
  });

  describe("Delete URL", () => {
    it("should register DELETE /urls/:id route", () => {
      expect(mockFastify.delete).toHaveBeenCalledWith(
        "/urls/:id",
        expect.any(Function)
      );
    });
  });

  describe("List URLs", () => {
    it("should register GET /urls route", () => {
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/urls",
        expect.any(Function)
      );
    });
  });

  describe("Redirect", () => {
    it("should register GET /:code route", () => {
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/:code",
        expect.any(Function)
      );
    });
  });

  describe("Stats", () => {
    it("should register GET /urls/:id/stats route", () => {
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/urls/:id/stats",
        expect.any(Function)
      );
    });
  });

  describe("QR Code", () => {
    it("should register GET /urls/:id/qr route", () => {
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/urls/:id/qr",
        expect.any(Function)
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle NotFoundError (404)", async () => {
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      const getHandler = routes.GET[1].handler;
      (
        mockUrlUseCases.getUrlById.execute as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new NotFoundError("URL not found"));

      await getHandler({ params: { id: "test-id" } }, mockReply);

      expect(mockReply.status).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalled();
      expect(mockReply.send.mock.calls[0][0]).toHaveProperty("error");
    });

    it("should handle BadRequestError (400)", async () => {
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      const getHandler = routes.GET[1].handler;
      (
        mockUrlUseCases.getUrlById.execute as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new BadRequestError("Invalid URL"));

      await getHandler({ params: { id: "test-id" } }, mockReply);

      expect(mockReply.status).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalled();
      expect(mockReply.send.mock.calls[0][0]).toHaveProperty("error");
    });

    it("should handle ConflictError (409)", async () => {
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      const postHandler = routes.POST[0].handler;
      (
        mockUrlUseCases.createUrl.execute as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new ConflictError("custom_code already exists"));

      await postHandler(
        { body: { url: "https://example.com", custom_code: "taken" } },
        mockReply
      );

      expect(mockReply.status).toHaveBeenCalledWith(409);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "custom_code already exists",
      });
    });

    it("should handle GoneError (410)", async () => {
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      const getHandler = routes.GET[1].handler;
      (
        mockUrlUseCases.getUrlById.execute as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new GoneError("URL expired"));

      await getHandler({ params: { id: "test-id" } }, mockReply);

      expect(mockReply.status).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalled();
      expect(mockReply.send.mock.calls[0][0]).toHaveProperty("error");
    });

    it("should handle generic errors with 500", async () => {
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      const getHandler = routes.GET[1].handler;
      (
        mockUrlUseCases.getUrlById.execute as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new Error("Database connection failed"));

      await getHandler({ params: { id: "test-id" } }, mockReply);

      expect(mockReply.status).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalled();
    });
  });
});
