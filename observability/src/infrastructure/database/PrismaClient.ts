import pg from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@postgres:5432/urlshortener?sslmode=disable",
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = createPrismaClient();
  }
  return prisma;
}

export async function closePrisma(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}
