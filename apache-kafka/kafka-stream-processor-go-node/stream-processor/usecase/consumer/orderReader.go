package consumer

import (
	"stream-processor/infra"

	"github.com/segmentio/kafka-go"
)

func OrderReader() *kafka.Reader {
	broker := infra.GetEnv("KAFKA_BROKER", "localhost:9092")

	inputTopic := "orders"
	groupId := "stream-processor"

	return kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{broker},
		Topic:    inputTopic,
		GroupID:  groupId,
		MinBytes: 1e3,
		MaxBytes: 10e6,
	})
}
