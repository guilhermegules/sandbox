import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { orderQueue } from "../queues";
import { logger } from "@/infra/logs/logger";

export async function produceOrder(data: OrderStatusChangedEvent) {
  logger.info(`Producing order ${JSON.stringify(data)}`);
  await orderQueue.add("process-order", data);
}
