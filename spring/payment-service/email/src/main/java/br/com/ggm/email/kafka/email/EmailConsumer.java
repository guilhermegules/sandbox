package br.com.ggm.email.kafka.email;

import br.com.ggm.email.domain.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmailConsumer {
  private final EmailService emailService;

  @KafkaListener(topics = "send-email")
  public void listen(String message) {
    log.info(String.format("Message :: %s", message));
    emailService.save(message);
  }
}
