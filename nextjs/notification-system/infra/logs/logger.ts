import pino from "pino";

const isPretty = process.env.APP_ENV === "dev";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: "order-service",
    env: process.env.APP_ENV,
  },
  transport: isPretty
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});
