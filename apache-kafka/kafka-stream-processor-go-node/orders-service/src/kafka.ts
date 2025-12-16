import { KafkaJS } from "@confluentinc/kafka-javascript";

export const kafka = new KafkaJS.Kafka({
  "bootstrap.servers": "localhost:9092",
  "client.id": "orders-service",
  "allow.auto.create.topics": true,
});
