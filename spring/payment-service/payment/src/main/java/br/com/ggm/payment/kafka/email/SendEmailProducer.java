package br.com.ggm.payment.kafka.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SendEmailProducer {
  private final KafkaTemplate<String, String> template;
  private static final String SEND_EMAIL_TOPIC = "send-email";

  public void produce(String message) {
    template.send(SEND_EMAIL_TOPIC, message);
    log.info("::: Sending message to topic %s :::".formatted(SEND_EMAIL_TOPIC));
  }
}
