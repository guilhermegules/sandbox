import { kafka } from "./kafka.js";

export const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}

export async function disconnectProducer() {
  await producer.disconnect();
}
