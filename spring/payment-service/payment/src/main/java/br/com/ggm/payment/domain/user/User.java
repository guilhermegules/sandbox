package br.com.ggm.paymentservice.domain.user;

import java.util.UUID;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "payment_user")
@Getter
public class User {

  @Id
  private UUID id;
  @Column("full_name")
  private String fullName;
  private String document;
  private String email;
  private String password;
  private UserType type;
}
