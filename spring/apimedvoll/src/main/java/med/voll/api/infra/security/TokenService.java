package med.voll.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import med.voll.api.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {
    private final static String TOKEN_ISSUER = "API_VOLLMED";

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer(TOKEN_ISSUER)
                    .withSubject(user.getLogin())
                    .withExpiresAt(this.expiresAt())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Error creating JWT token", exception);
        }
    }

    public String getSubject(String jwtToken) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer(TOKEN_ISSUER)
                    .build()
                    .verify(jwtToken)
                    .getSubject();
        } catch (JWTCreationException jwtCreationException) {
            throw new RuntimeException("JWT token invalid or expired!");
        }
    }

    private Instant expiresAt() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
