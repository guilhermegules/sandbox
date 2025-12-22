import type { Order } from "../domain/Order.js";
import { kafka } from "../infra/kafka.js";

const producer = kafka.producer();

export const sendOrder = async (order: Order) => {
  await producer.send({
    topic: process.env["KAFKA_ORDER_TOPIC"]!,
    messages: [{ value: JSON.stringify(order) }],
  });
};
