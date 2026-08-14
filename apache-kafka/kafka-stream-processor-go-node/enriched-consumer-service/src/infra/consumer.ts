import { kafka } from "./kafka";

export const consumer = kafka.consumer({
  "group.id": process.env["KAFKA_GROUP_ID"]!,
  "enable.auto.commit": true,
});

export async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "orders.enriched",
  });
}
