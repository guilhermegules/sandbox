import { OrderStatus } from "@/domain/order/order-status";
import { ORDER_STATUS_QUEUE } from "../queues";
import { Worker } from "bullmq";
import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { redisConnection, redisPublisher } from "@/infra/redis/redis";
import { ORDER_EVENTS_CHANNEL } from "@/infra/redis/channels";

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

    for (const status of statuses) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
