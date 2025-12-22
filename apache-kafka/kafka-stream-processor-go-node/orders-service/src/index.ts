import express from "express";

import type { Order } from "./domain/Order.js";
import { sendOrder } from "./usecase/send-order.usecase.js";
import { connectProducer, disconnectProducer } from "./infra/producer.js";

if (!process.env["KAFKA_ORDER_TOPIC"]) {
  throw new Error("KAFKA_ORDER_TOPIC is required");
}

const app = express();

app.use(express.json());

app.post("/orders", async (req, res) => {
  const order = req.body as Order;

  await sendOrder(order);

  res.status(201).json({ order });
});

async function main() {
  await connectProducer();
  app.listen(process.env["PORT"], () =>
    console.log(`orders-service started on port ${process.env["PORT"]}`)
  );
}

process.on("SIGINT", async () => {
  await disconnectProducer();
  process.exit(0);
});

main();
