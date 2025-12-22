package consumer

import (
	"context"
	"log"
	"stream-processor/infra"

	"github.com/segmentio/kafka-go"
)

func OrderConsumer() kafka.Message {
	broker := infra.GetEnv("KAFKA_BROKER", "localhost:9092")

	inputTopic := "orders"
	groupId := "stream-processor"

	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{broker},
		Topic:    inputTopic,
		GroupID:  groupId,
		MinBytes: 1e3,
		MaxBytes: 10e6,
	})

	ctx := context.Background()

	log.Printf("📥 Consuming from: %s", inputTopic)

	msg, err := reader.ReadMessage(ctx)
	if err != nil {
		log.Fatal("❌ read error:", err)
	}

	return msg
}
