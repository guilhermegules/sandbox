package br.com.ggm.paymentservice.domain.user;

import br.com.ggm.paymentservice.domain.user.dto.UserDTO;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public Mono<UserDTO> findUserById(UUID id) {
    return this.userRepository.findById(id).map(this::userDTOMapper);
  }

  private UserDTO userDTOMapper(User user) {
    return new UserDTO(user.getId(), user.getFullName(), user.getDocument(), user.getEmail(),
        user.getPassword(), user.getType());
  }
}
