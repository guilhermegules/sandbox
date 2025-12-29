package br.com.ggm.paymentservice.domain.transfer.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record TransferDTO(BigDecimal value, UUID payer, UUID payee) {

}
