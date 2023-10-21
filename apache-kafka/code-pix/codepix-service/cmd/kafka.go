/*
Copyright © 2023 Guilherme Gules Moreira <guilhermegules@gmail.com>

*/
package cmd

import (
	"github.com/spf13/cobra"
	"github.com/guilhermegules/code-pix/application/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

// kafkaCmd represents the kafka command
var kafkaCmd = &cobra.Command{
	Use:   "kafka",
	Short: "Start consuming transactions using Apache Kafka",
	Run: func(cmd *cobra.Command, args []string) {
		producer := kafka.NewKafkaProducer()
		deliveryChan := make(chan ckafka.Event)
		kafka.Publish("Hey Kafka", "teste", producer, deliveryChan)
		kafka.DeliveryReport(deliveryChan)
	},
}

func init() {
	rootCmd.AddCommand(kafkaCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// kafkaCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// kafkaCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
