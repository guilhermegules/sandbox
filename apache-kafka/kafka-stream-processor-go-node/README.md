# Kafka Stream Processor

## Setup

- Start docker with `docker compose up`
- Create `orders.enriched` topic
  - `sh
docker exec -it kafka kafka-topics \
--bootstrap-server localhost:9092 \
--create \
--topic orders.enriched \
--partitions 3 \
--replication-factor 1
`
- Check topics creation `docker exec -it kafka kafka-topics \
--bootstrap-server localhost:9092 \
--describe \
--topic orders.enriched`
- Install orders-service dependencies
  - `npm i`
- Start orders-service
  - `npm run dev`
- Run stream processor
  - `go run main.go`
- Install enriched-consumer-service
  - `npm i`
- Run enriched-consumer-service
  - `npm run dev`
