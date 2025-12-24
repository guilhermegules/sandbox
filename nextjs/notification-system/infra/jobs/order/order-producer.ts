import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { orderQueue } from "../queues";

export async function produceOrder(data: OrderStatusChangedEvent) {
  await orderQueue.add("process-order", data);
}
