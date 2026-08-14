import { OrderStatus } from "@/domain/order/order-status";
import { ORDER_STATUS_QUEUE } from "../queues";
import { Worker } from "bullmq";
import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { redisConnection, redisPublisher } from "@/infra/redis/redis";
import { ORDER_EVENTS_CHANNEL } from "@/infra/redis/channels";
import { logger } from "@/infra/logs/logger";

const statuses: OrderStatus[] = [
  "CREATED",
  "DELIVERED",
  "PAID",
  "PROCESSING",
  "SHIPPED",
];

new Worker(
  ORDER_STATUS_QUEUE,
  async (job) => {
    const { orderId, userId } = job.data as OrderStatusChangedEvent;
    logger.info("Start order working");

    for (const status of statuses) {
      logger.debug(`processing order ${orderId} with status ${status}`);

      await redisPublisher.publish(
        ORDER_EVENTS_CHANNEL,
        JSON.stringify({
          orderId,
          userId,
          status,
          timestamp: new Date().toISOString(),
        })
      );
    }
  },
  { connection: redisConnection }
);
