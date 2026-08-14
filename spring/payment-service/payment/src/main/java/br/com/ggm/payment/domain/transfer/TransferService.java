package br.com.ggm.paymentservice.domain.transfer;

import br.com.ggm.paymentservice.domain.account.AccountService;
import br.com.ggm.paymentservice.domain.account.dto.AccountDTO;
import br.com.ggm.paymentservice.domain.transfer.dto.CreateTransferDTO;
import br.com.ggm.paymentservice.domain.transfer.dto.TransferDTO;
import br.com.ggm.paymentservice.domain.user.UserService;
import br.com.ggm.paymentservice.domain.user.UserType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import static reactor.core.publisher.Mono.zip;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransferService {

  private final TransferRepository transferRepository;

  private final UserService userService;

  private final AccountService accountService;

  @Transactional
  public Mono<CreateTransferDTO> transfer(TransferDTO transferDTO) {
    final Mono<AccountDTO> payeeAccount = accountService.findAccountById(transferDTO.payee());
    final Mono<AccountDTO> payerAccount = accountService.findAccountById(transferDTO.payer());

    return zip(payeeAccount, payerAccount)
        .filter(accounts -> !accounts.getT2().id().equals(accounts.getT1().id()))
        .switchIfEmpty(Mono.error(new RuntimeException("Payer and Payee should not be equal")))
        .flatMap(accounts -> {
          final AccountDTO payeeAccountT = accounts.getT1();
          final AccountDTO payerAccountT = accounts.getT2();

          final var payerAccountDTO = new AccountDTO(
              payerAccountT.id(),
              payerAccountT.paymentUserId(),
              payerAccountT.balance().subtract(transferDTO.value()));

          final var payeeAccountDTO = new AccountDTO(
              payeeAccountT.id(),
              payeeAccountT.paymentUserId(),
              payeeAccountT.balance().add(transferDTO.value()));

          return zip(
              accountService.update(payeeAccountDTO),
              accountService.update(payerAccountDTO)
          );
        })
        .flatMap(accounts -> {
          final var payee = userService.findUserById(accounts.getT1().paymentUserId());
          final var payer = userService.findUserById(accounts.getT2().paymentUserId());

          return zip(payee, payer);
        })
        .filter(payment -> payment.getT2().type() != UserType.SHOPKEEPER)
        .switchIfEmpty(Mono.error(new RuntimeException("Payer should not be a SHOPKEEPER")))
        .flatMap(users -> save(transferDTO))
        .map(this::createTransferDTOMapper);
  }

  @Transactional
  private Mono<Transfer> save(TransferDTO transferDTO) {
    return transferRepository.save(
        new Transfer(transferDTO.value(), transferDTO.payer(), transferDTO.payee())
    );
  }

  private CreateTransferDTO createTransferDTOMapper(Transfer transfer) {
    return new CreateTransferDTO(transfer.getValue(), transfer.getId());
  }
}
