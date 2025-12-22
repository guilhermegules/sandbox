import express from "express";
import { kafka } from "./infra/kafka.js";
import type { Order } from "./domain/Order.js";
import { sendOrder } from "./usecase/send-order.usecase.js";

const producer = kafka.producer();

const app = express();

app.use(express.json());

app.post("/orders", async (req, res) => {
  const order = req.body as Order;

  await sendOrder(order);

  res.status(201).json({ order });
});

async function main() {
  await producer.connect();
  app.listen(process.env["PORT"], () =>
    console.log(`orders-service started on port ${process.env["PORT"]}`)
  );
}

main();
