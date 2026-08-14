package com.study.messagingrabbitmq.domain.message;

import com.study.messagingrabbitmq.MessagingRabbitmqApplication;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MessageRunner implements CommandLineRunner {

  private final RabbitTemplate template;
  private final Receiver receiver;
  private static final Logger LOGGER = LoggerFactory.getLogger(MessageRunner.class);

  public MessageRunner(Receiver receiver, RabbitTemplate template) {
    this.receiver = receiver;
    this.template = template;
  }

  @Override
  public void run(String... args) throws Exception {
    LOGGER.info("Sending message...");
    template.convertAndSend(
        MessagingRabbitmqApplication.TOPIC_EXCHANGE_NAME, "foo.bar.baz", "Hello from RabbitMQ!");
    receiver.getLatch().await(1000, TimeUnit.MILLISECONDS);
  }
}
