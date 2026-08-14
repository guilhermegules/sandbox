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

func OrderProcessor() {
	broker := infra.GetEnv("KAFKA_BROKER", "localhost:9092")

	outputTopic := "orders.enriched"

	reader := consumer.OrderReader()

	defer reader.Close()

	writer := &kafka.Writer{
		Addr:         kafka.TCP(broker),
		Topic:        outputTopic,
		Balancer:     &kafka.LeastBytes{},
		RequiredAcks: kafka.RequireAll,
		Async:        false,
	}

	defer writer.Close()

	log.Println("🚀 Go Stream Processor started")
	log.Println("📥 Consuming from: orders")
	log.Printf("📤 Producing to: %s", outputTopic)

	ctx := context.Background()

	for {
		msg, err := reader.ReadMessage(ctx)
		if err != nil {
			log.Println("⚠️ transient read error:", err)
			time.Sleep(2 * time.Second)
			continue
		}

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
