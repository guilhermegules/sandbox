import { randomBytes } from "node:crypto";

export function generateCode(): string {
  return randomBytes(3).toString("hex");
}
