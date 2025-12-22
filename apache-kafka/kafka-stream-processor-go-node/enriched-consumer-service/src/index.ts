import { kafka } from "./kafka";

async function start() {
  const consumer = kafka.consumer({
    "group.id": process.env["KAFKA_GROUP_ID"],
    "enable.auto.commit": true,
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "orders.enriched",
  });

  console.log("📥 Enriched Order Consumer running...");

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

start().catch((err) => {
  console.error("❌ Consumer failed:", err);
  process.exit(1);
});
