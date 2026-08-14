import type { Order } from "../domain/Order.js";
import { producer } from "../infra/producer.js";

export const sendOrder = async (order: Order) => {
  console.log(`Producing Order ${JSON.stringify(order)}`);
  await producer.send({
    topic: process.env["KAFKA_ORDER_TOPIC"]!,
    messages: [{ value: JSON.stringify(order) }],
  });
};
