# Messaging RabbitMQ

Application that publishes a message by using Spring AMQP's `RabbitTemplate` and subscribes to the message on a POJO by using `MessageListenerAdapter`

## What you need

- Java 17+
- Gradle 7.5+
- RabbitMQ or Docker/docker compose

## How run?

- Run `docker compose -d up`
- Start application `./gradlew bootRun`