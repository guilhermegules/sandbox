package br.com.ggm.paymentservice.domain.user.dto;

import br.com.ggm.paymentservice.domain.user.UserType;
import java.util.UUID;

public record UserDTO(UUID id, String fullName, String document, String email, String password,
                      UserType type) {

}
