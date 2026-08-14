package br.com.ggm.paymentservice.domain.transfer.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateTransferDTO(BigDecimal value, UUID id) {

}
