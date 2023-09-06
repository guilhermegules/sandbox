# Apache Kafka Playground

![](./store.png)

- Start zookeeper
  - bin/zookeeper-start-server.sh config/zookeeper.properties
- Start kafka
  - bin/kafka-server-start.sh config/server.properties
- Create topic
  - bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic ECOMMERCE_NEW_ORDER
- List topics
  - bin/kafka-topics.sh --list --bootstrap-server localhost:9092
- Create console producer
  - bin/kafka-console-producer.sh --broker-list localhost:9092 --topic ECOMMERCE_NEW_ORDER
- Create console consumer
  - bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic ECOMMERCE_NEW_ORDER --from-beginning
  - --from-beginning is a optional flag, it will tell kafka to look for messages published before the consumer be builded
- List consumer group
  - bin/kafka-consumer-groups.sh --all-groups --bootstrap-server localhost:9092 --describe
- Update a created topic
  - bin/kafka-topics.sh --alter --bootstrap-server localhost:9092 --topic TOPIC_NAME --partitions partition_number

- [Install kafka](https://www.linode.com/docs/guides/how-to-install-apache-kafka-on-ubuntu/)
