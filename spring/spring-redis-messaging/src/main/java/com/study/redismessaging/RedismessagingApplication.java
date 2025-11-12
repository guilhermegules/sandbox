package com.study.redismessaging;

import com.study.redismessaging.domain.message.Receiver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@SpringBootApplication
public class RedismessagingApplication {

  private static final Logger LOGGER = LoggerFactory.getLogger(RedismessagingApplication.class);
  private static final String MESSAGE_TOPIC = "message-topic";

  @Bean
  RedisMessageListenerContainer container(
      RedisConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter) {

    RedisMessageListenerContainer container = new RedisMessageListenerContainer();
    container.setConnectionFactory(connectionFactory);
    container.addMessageListener(listenerAdapter, new PatternTopic(MESSAGE_TOPIC));

    return container;
  }

  @Bean
  MessageListenerAdapter listenerAdapter(Receiver receiver) {
    return new MessageListenerAdapter(receiver, "receiveMessage");
  }

  @Bean
  Receiver receiver() {
    return new Receiver();
  }

  @Bean
  StringRedisTemplate template(RedisConnectionFactory connectionFactory) {
    return new StringRedisTemplate(connectionFactory);
  }

  public static void main(String[] args) throws InterruptedException {

    final var ctx = SpringApplication.run(RedismessagingApplication.class, args);
    final var template = ctx.getBean(StringRedisTemplate.class);
    final var receiver = ctx.getBean(Receiver.class);

    while (receiver.getCount() == 0) {
      LOGGER.info("Sending message...");
      template.convertAndSend(MESSAGE_TOPIC, "Hello from Redis!");
      Thread.sleep(500L);
    }

    System.exit(0);
  }
}
