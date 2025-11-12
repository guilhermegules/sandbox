# Spring Redis Messaging

Application that uses `StringRedisTemplate` to publish a string message and has a `POJO` to subscribe for the message by using `MessageListenerAdapter`

## What do you need?

- Java 17
- Gradle 7.5+ or Maven 3.5+
- Redis

## How start?

- [Install redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
- Run `redis-server`
- Install dependencies `./mvnw clean install`
- Run application `./mvnw spring-boot:run`