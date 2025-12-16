import express from "express";
import { kafka } from "./kafka.js";

const producer = kafka.producer();

const app = express();

app.use(express.json());

app.post("/orders", async (req, res) => {
  const order = req.body;

  await producer.send({
    topic: "orders",
    messages: [{ value: JSON.stringify(order) }],
  });

  res.status(201).json({ order });
});

async function main() {
  await producer.connect();
  app.listen(process.env["PORT"], () =>
    console.log(`orders-service started on port ${process.env["PORT"]}`)
  );
}

main();
