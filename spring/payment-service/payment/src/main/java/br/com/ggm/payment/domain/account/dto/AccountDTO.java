package br.com.ggm.paymentservice.domain.account.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record AccountDTO(UUID id,
                         UUID paymentUserId,
                         BigDecimal balance) {

}
