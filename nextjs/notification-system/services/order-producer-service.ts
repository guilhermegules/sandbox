import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { ORDER_EVENTS_CHANNEL } from "@/infra/redis/channels";
import { redisPublisher } from "@/infra/redis/redis";
import { getUserFromCookie } from "@/utils/cookies";
import { EventEmitter } from "stream";

export const orderEvents = new EventEmitter();

export async function sendOrder(
  req: Request
): Promise<OrderStatusChangedEvent> {
  const user = getUserFromCookie(req);

  if (!user) {
    throw new Error("No user on session");
  }

  const event: OrderStatusChangedEvent = {
    orderId: crypto.randomUUID(),
    userId: user?.id,
    status: "SHIPPED",
    timestamp: new Date().toISOString(),
  };

  console.log(event);

  await redisPublisher.publish(ORDER_EVENTS_CHANNEL, JSON.stringify(event));

  return event;
}
