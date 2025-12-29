package br.com.ggm.paymentservice.domain.transfer;

import java.util.UUID;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends ReactiveCrudRepository<Transfer, UUID> {

}
