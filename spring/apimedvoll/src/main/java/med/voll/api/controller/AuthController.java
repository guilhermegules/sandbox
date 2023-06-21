package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.user.AuthData;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public ResponseEntity<Object> auth(@RequestBody @Valid AuthData authData) {
        var token = new UsernamePasswordAuthenticationToken(authData.login(), authData.password());
        var autentication = this.authenticationManager.authenticate(token);
        return ResponseEntity.ok().build();
    }
}
