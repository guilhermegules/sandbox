import { describe, expect, it } from "vitest";
import {
  AppError,
  BadRequestError,
  ConflictError,
  GoneError,
  NotFoundError,
} from "./domain/errors/AppError.js";

describe("AppError", () => {
  it("should create an error with statusCode", () => {
    const error = new AppError("Test error", 500);
    expect(error.message).toBe("Test error");
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
  });

  it("should be instance of Error", () => {
    const error = new AppError("Test", 500);
    expect(error instanceof Error).toBe(true);
  });
});

describe("NotFoundError", () => {
  it("should have statusCode 404", () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Resource not found");
  });

  it("should accept custom message", () => {
    const error = new NotFoundError("Custom not found");
    expect(error.message).toBe("Custom not found");
  });
});

describe("BadRequestError", () => {
  it("should have statusCode 400", () => {
    const error = new BadRequestError("Invalid input");
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Invalid input");
  });
});

describe("ConflictError", () => {
  it("should have statusCode 409", () => {
    const error = new ConflictError("Already exists");
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe("Already exists");
  });
});

describe("GoneError", () => {
  it("should have statusCode 410", () => {
    const error = new GoneError();
    expect(error.statusCode).toBe(410);
    expect(error.message).toBe("Resource expired");
  });

  it("should accept custom message", () => {
    const error = new GoneError("Link expired");
    expect(error.message).toBe("Link expired");
  });
});
