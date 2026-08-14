import { consumer } from "../infra/consumer";

export async function enrichedOrderConsumer() {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const raw = message.value.toString();

      try {
        const enrichedOrder = JSON.parse(raw);

        console.log("✅ Enriched order received:", {
          topic,
          partition,
          key: message.key?.toString(),
          value: enrichedOrder,
        });
      } catch (err) {
        console.error("❌ Invalid message:", err, raw);
      }
    },
  });
}
