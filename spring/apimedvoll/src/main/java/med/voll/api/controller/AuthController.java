package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.user.AuthData;
import med.voll.api.domain.user.User;
import med.voll.api.infra.security.TokenJWTData;
import med.voll.api.infra.security.TokenService;
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
    private TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<Object> auth(@RequestBody @Valid AuthData authData) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(authData.login(), authData.password());
        var authentication = this.authenticationManager.authenticate(authenticationToken);
        var tokenJwt = this.tokenService.generateToken((User) authentication.getPrincipal());
        return ResponseEntity.ok(new TokenJWTData(tokenJwt));
    }
}
