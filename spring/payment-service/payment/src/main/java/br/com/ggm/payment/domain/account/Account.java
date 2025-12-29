package br.com.ggm.paymentservice.domain.account;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "account")
@Getter
@AllArgsConstructor
public class Account {

  @Id
  private UUID id;
  @Column("payment_user_id")
  private UUID paymentUserId;
  private BigDecimal balance;
  @Column("created_at")
  private LocalDate createdAt;
}
