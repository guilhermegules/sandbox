package br.com.ggm.paymentservice.domain.transfer;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "transfer")
@Getter
@NoArgsConstructor
public class Transfer {

  @Id
  private UUID id;
  private BigDecimal value;
  @Column("payer_id")
  private UUID payerId;
  @Column("payee_id")
  private UUID payeeId;
  @Column("created_at")
  private LocalDate createdAt;

  public Transfer(BigDecimal value, UUID payerId, UUID payeeId) {
    this.value = value;
    this.payerId = payerId;
    this.payeeId = payeeId;
    this.createdAt = LocalDate.now();
  }
}
