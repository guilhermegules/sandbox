package usecase

import (
	"context"
	"encoding/json"
	"log"
	"stream-processor/domain"
	"stream-processor/infra"
	"stream-processor/usecase/consumer"
	"time"

	"github.com/segmentio/kafka-go"
)

func OrderProducer() {
	broker := infra.GetEnv("KAFKA_BROKER", "localhost:9092")

	outputTopic := "orders.enriched"

	writer := &kafka.Writer{
		Addr:         kafka.TCP(broker),
		Topic:        outputTopic,
		Balancer:     &kafka.LeastBytes{},
		RequiredAcks: kafka.RequireAll,
		Async:        false,
	}

	log.Println("🚀 Go Stream Processor started")
	log.Printf("📤 Producing to: %s", outputTopic)

	ctx := context.Background()

	for {
		msg := consumer.OrderConsumer()

		var order domain.Order
		if err := json.Unmarshal(msg.Value, &order); err != nil {
			log.Println("⚠️ invalid message, skipping:", err)
			continue
		}

		enriched := domain.EnrichedOrder{
			Order:        order,
			ProcessedAt:  time.Now().UTC(),
			TotalWithTax: order.Value * 1.2,
		}

		payload, err := json.Marshal(enriched)
		if err != nil {
			log.Println("❌ marshal error:", err)
			continue
		}

		err = writer.WriteMessages(ctx, kafka.Message{
			Key:   []byte(order.Id),
			Value: payload,
		})

		if err != nil {
			log.Println("❌ write error:", err)
			continue
		}

		log.Printf("✅ processed order %s", order.Id)
	}
}
