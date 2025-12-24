import { redisConnection } from "../redis/redis";
import { Queue } from "bullmq";

export const ORDER_STATUS_QUEUE = "order-status";

export const orderQueue = new Queue(ORDER_STATUS_QUEUE, {
  connection: redisConnection,
});
