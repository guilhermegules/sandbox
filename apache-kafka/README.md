# Apache Kafka

## Events

- Internet of things
- Business process change
- User interaction
- Microservice output

Notification + State

State usually is formatted in an standard format like JSON, proton buffers, etc

The key of kafka topic is like a id for the event

## Topics

- Named container for similar events
  - System contain lots of topics
  - Can duplicate data between topics
- Durable logs of events
  - Append only
  - Can only seek offset, not indexed
- Events are immutable
- Topics are durable

## Partitions

- Partition break a topic in diferents parts
- If not have key, the partition will be placed round robin to each partition

## Brokers

- An computer, instance or container running the Kafka process
- Manage partitions
- Handle write and read requests
- Manage replication of partitions
- Intentionally very simple

## Replication

- Copies of data for fault tolerance
- One lead partition and N-1 followers
- In general, writes and reads happens to the leader
- Tunable in the Producer

## Producers

- Client application
- Puts messages into topics
- Connection pooling
- Network buffering
- Partitioning

```java
try (KafkaProducer<String, Payment> producer = new KafkaProducer<>(props)) {

    for (long i = 0; i < 10; i++) {
        final String orderId = "id" + Long.toString(i);
        final Payment payment = new Payment(orderId, 1000.00d);
        final ProducerRecord<String, Payment> record =
           new ProducerRecord<>("transactions",
                                        payment.getId().toString(),
                                        payment);
        producer.send(record);
   }
} catch (final InterruptedException e) {
    e.printStackTrace();
}
```

## Consumer

- Using the consumer API is similar in principle to the producer.
- You use a class called KafkaConsumer to connect to the cluster, passing a configuration map to specify the address of the cluster, security, and other parameters.
- Then you use that connection to subscribe to one or more topics.
- When messages are available on those topics, they come back in a collection called ConsumerRecords.
- ConsumerRecords contain individual instances of messages in the form of ConsumerRecord objects.
- A ConsumerRecord object represents the key/value pair of a single Apache Kafka message.

```java
try (final KafkaConsumer<String, Payment> consumer = new KafkaConsumer<>(props)) {
    consumer.subscribe(Collections.singletonList(TOPIC));

     while (true) {
        ConsumerRecords<String, Payment> records = consumer.poll(100);
        for (ConsumerRecord<String, Payment> record : records) {
            String key = record.key();
            Payment value = record.value();
            System.out.printf("key = %s, value = %s%n", key, value);
        }
      }
    }
```

## Schema Registry

- Server process external to kafka brokers
- Maintains a database of schemas
- HA deployment option available
- Consumer/Producer API component
- Defines schema compatibility rules per topic
- Producer API prevents incompatilble messages from being produced
  
## ksqlDB

- A database optimized for stream processing
- Runs on its own scalable, fault tolerant cluster adjacent to the Kafka cluster
- command-line interface
- REST API for application integration
- Java Library
- Kafka Connection integration
