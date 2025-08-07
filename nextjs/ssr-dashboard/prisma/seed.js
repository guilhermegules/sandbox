import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function bootstrap() {
  await Promise.all([prisma.payment.deleteMany(), prisma.user.deleteMany()]);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Ana Silva",
        email: "ana.silva@example.com",
        payments: {
          create: [
            { amount: 150.5, paidAt: new Date("2025-01-15") },
            { amount: 200.0, paidAt: new Date("2025-02-17") },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Carlos Souza",
        email: "carlos.souza@example.com",
        payments: {
          create: [{ amount: 300.0, paidAt: new Date("2025-03-01") }],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Beatriz Almeida",
        email: "beatriz.almeida@example.com",
        payments: {
          create: [
            { amount: 120.0, paidAt: new Date("2025-01-20") },
            { amount: 180.0, paidAt: new Date("2025-04-05") },
          ],
        },
      },
    }),
  ]);

  console.log(`Created ${users.length} users with payment.`);
}

bootstrap()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
