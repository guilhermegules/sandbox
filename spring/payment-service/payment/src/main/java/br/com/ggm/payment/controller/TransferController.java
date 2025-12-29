package br.com.ggm.paymentservice.controller;

import br.com.ggm.paymentservice.domain.transfer.TransferService;
import br.com.ggm.paymentservice.domain.transfer.dto.CreateTransferDTO;
import br.com.ggm.paymentservice.domain.transfer.dto.TransferDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("transfer")
@RequiredArgsConstructor
public class TransferController {

  private final TransferService transferService;

  @PostMapping
  public Mono<ResponseEntity<CreateTransferDTO>> transfer(
      @RequestBody TransferDTO transferDTO,
      UriComponentsBuilder uriBuilder
  ) {
    return transferService.transfer(transferDTO).map(transfer -> {
      final var uri = uriBuilder.path("/transfer/{transferId}").buildAndExpand(transfer.id())
          .toUri();
      return ResponseEntity.created(uri).body(transfer);
    });
  }
}
