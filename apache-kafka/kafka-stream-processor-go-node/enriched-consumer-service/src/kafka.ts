import { KafkaJS } from "@confluentinc/kafka-javascript";

export const kafka = new KafkaJS.Kafka({
  "bootstrap.servers": process.env["KAFKA_BROKER"]!,
  "client.id": process.env["KAFKA_BROKER_CLIENT_ID"]!,
  "allow.auto.create.topics": true,
});
