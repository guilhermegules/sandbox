package br.com.ggm.email.domain.email;


import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
public class Email {
  @Id
  private UUID id;
  private String message;

  public Email(String message) {
    this.message = message;
  }
}
