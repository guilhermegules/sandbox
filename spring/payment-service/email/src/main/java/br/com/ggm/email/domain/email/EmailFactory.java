package br.com.ggm.email.domain.email;

import org.springframework.stereotype.Service;

@Service
public class EmailFactory {

  public Email build(String message) {
    return Email
        .builder()
        .message(message)
        .build();
  }
}
