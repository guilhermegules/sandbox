package br.com.ggm.paymentservice.domain.account;

import br.com.ggm.paymentservice.domain.account.dto.AccountDTO;
import java.time.LocalDate;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final AccountRepository accountRepository;

  public Mono<AccountDTO> findAccountById(UUID id) {
    return this.accountRepository.findById(id).map(this::accountDTOMapper);
  }

  @Transactional
  public Mono<AccountDTO> update(AccountDTO accountDTO) {
    return this.accountRepository.findById(accountDTO.id())
        .map(account -> new Account(
            account.getId(),
            account.getPaymentUserId(),
            accountDTO.balance(),
            LocalDate.now()))
        .flatMap(this.accountRepository::save)
        .map(this::accountDTOMapper);
  }

  private AccountDTO accountDTOMapper(Account account) {
    return new AccountDTO(account.getId(), account.getPaymentUserId(),
        account.getBalance());
  }
}
