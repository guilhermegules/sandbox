import { Prisma, PrismaClient } from "@prisma/client";
import { CreateWithTransactionResponse, UrlRepository } from "../../application/repositories/IUrlRepository.js";
import { Url } from "../../domain/entities/Url.js";
import { getPrisma } from "../database/PrismaClient.js";

function isTransactionConflictError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P40001" || error.code === "P2034" || error.code === "P2002";
  }
  if (error instanceof Error) {
    const cause = (error as any).cause;
    if (cause && typeof cause === "object" && "originalCode" in cause) {
      return cause.originalCode === "40001";
    }
  }
  return false;
}

export class PostgresUrlRepository implements UrlRepository {
  private get prisma(): PrismaClient {
    return getPrisma();
  }

  async findById(id: string): Promise<Url | null> {
    const result = await this.prisma.url.findUnique({ where: { id } });
    return result ? this.mapToUrl(result) : null;
  }

  async findByCode(code: string): Promise<Url | null> {
    const result = await this.prisma.url.findUnique({ where: { code } });
    return result ? this.mapToUrl(result) : null;
  }

  async findByUrl(url: string): Promise<Url | null> {
    const result = await this.prisma.url.findFirst({
      where: {
        url,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });
    return result ? this.mapToUrl(result) : null;
  }

  async findByCodeExists(code: string): Promise<boolean> {
    const result = await this.prisma.url.findUnique({
      where: { code },
      select: { id: true },
    });
    return !!result;
  }

  async findAll(
    page: number,
    perPage: number,
  ): Promise<{ urls: Url[]; total: number }> {
    const [urls, total] = await Promise.all([
      this.prisma.url.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.url.count(),
    ]);
    return { urls: urls.map(this.mapToUrl), total };
  }

  async createWithTransaction(
    url: string,
    code: string,
    expiresAt: Date | null,
  ): Promise<CreateWithTransactionResponse | null> {
    try {
      const result = await this.prisma.$transaction(
        async (tx) => {
          const existingUrl = await tx.url.findFirst({
            where: {
              url,
              OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
            },
          });

          if (existingUrl) return { ...existingUrl, isExisting: true };

          if (code) {
            const existentCode = await tx.url.findFirst({
              where: {
                code,
              },
            });

            if (existentCode) return null;
          }

          const newUrl = await tx.url.create({
            data: { code, url, expiresAt },
          });

          return { ...newUrl, isExisting: false };
        }
      );
      return result
        ? { url: this.mapToUrl(result), isExisting: result.isExisting }
        : null;
    } catch (error) {
      if (isTransactionConflictError(error)) {
        const [existingByUrl, existingByCode] = await Promise.all([
          this.prisma.url.findUnique({ where: { url } }),
          code
            ? this.prisma.url.findUnique({ where: { code } })
            : Promise.resolve(null),
        ]);

        if (existingByCode) {
          return null;
        }

        if (existingByUrl) {
          return { url: this.mapToUrl(existingByUrl), isExisting: true };
        }

        return null;
      }

      throw error;
    }
  }

  async update(
    id: string,
    url: string | null,
    expiresAt: Date | null,
  ): Promise<Url> {
    const updateData: Prisma.UrlUpdateInput = { expiresAt };
    if (url !== null) {
      updateData.url = url;
    }
    const result = await this.prisma.url.update({
      where: { id },
      data: updateData,
    });
    return this.mapToUrl(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.url.delete({ where: { id } });
  }

  async incrementClickCount(id: string): Promise<void> {
    await this.prisma.url.update({
      where: { id },
      data: { clickCount: { increment: 1 } },
    });
  }

  async recordClick(urlId: string): Promise<void> {
    await this.prisma.click.create({
      data: { urlId },
    });
  }

  async getClickStats(id: string): Promise<{
    clicksPerDay: Array<{ date: string; count: number }>;
    clicksPerHour: Array<{ hour: Date; count: number }>;
  }> {
    const [clicksPerDay, clicksPerHour] = await Promise.all([
      this.prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT TO_CHAR(DATE(clicked_at), 'YYYY-MM-DD') as date, COUNT(*)::bigint as count
        FROM clicks
        WHERE url_id = ${id}
        GROUP BY DATE(clicked_at)
        ORDER BY date DESC
        LIMIT 30
      `,
      this.prisma.$queryRaw<Array<{ hour: Date; count: bigint }>>`
        SELECT DATE_TRUNC('hour', clicked_at) as hour, COUNT(*)::bigint as count
        FROM clicks
        WHERE url_id = ${id}
        GROUP BY DATE_TRUNC('hour', clicked_at)
        ORDER BY hour DESC
        LIMIT 24
      `,
    ]);

    return {
      clicksPerDay: clicksPerDay.map((row) => ({
        date: row.date,
        count: Number(row.count),
      })),
      clicksPerHour: clicksPerHour.map((row) => ({
        hour: row.hour,
        count: Number(row.count),
      })),
    };
  }

  private mapToUrl(p: {
    id: string;
    code: string;
    url: string;
    expiresAt: Date | null;
    clickCount: bigint;
    createdAt: Date;
    updatedAt: Date;
  }): Url {
    return new Url({
      id: p.id,
      code: p.code,
      url: p.url,
      expiresAt: p.expiresAt,
      clickCount: Number(p.clickCount),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    });
  }
}
