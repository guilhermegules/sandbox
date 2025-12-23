import { OrderStatus } from "./order-status";

export type OrderStatusChangedEvent = {
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  userId: string;
};
