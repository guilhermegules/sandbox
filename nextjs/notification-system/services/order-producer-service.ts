import { getUserFromCookie } from "@/utils/cookies";
import { EventEmitter } from "stream";

export const orderEvents = new EventEmitter();

export function simulateOrder(req: Request) {
  const statuses = [
    "CREATED",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
  ] as const;

  let index = 0;

  const user = getUserFromCookie(req);

  const interval = setInterval(() => {
    orderEvents.emit("order-status", {
      orderId: crypto.randomUUID(),
      status: statuses[index],
      timestamp: new Date().toISOString(),
      userId: user?.id,
    });

    index++;

    if (index >= statuses.length) {
      clearInterval(interval);
    }
  }, 2000);
}
