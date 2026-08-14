import Redis from "ioredis";

export const redisPublisher = new Redis();
export const redisSubscriber = new Redis();
export const redisConnection = new Redis({ maxRetriesPerRequest: null });
