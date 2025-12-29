package br.com.ggm.email.domain.email;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
  private final EmailRepository emailRepository;
  private final EmailFactory emailFactory;

  public void save(String message) {
    this.emailRepository.save(emailFactory.build(message));
  }
}
