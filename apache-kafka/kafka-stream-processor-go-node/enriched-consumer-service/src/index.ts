import { startConsumer } from "./infra/consumer";
import { enrichedOrderConsumer } from "./usecase/enriched-order-consumer";

async function start() {
  await startConsumer();
  console.log("📥 Enriched Order Consumer running...");
  await enrichedOrderConsumer();
}

start().catch((err) => {
  console.error("❌ Consumer failed:", err);
  process.exit(1);
});
