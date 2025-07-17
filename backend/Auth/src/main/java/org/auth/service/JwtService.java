package org.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    private final Algorithm algorithm;

    public JwtService(@Value("${spring.security.jwt.secret-key}") String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String create(long time, Long id) {
        return JWT.create()
                .withIssuer("auth_stream")
                .withSubject(id.toString())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + time))
                .sign(algorithm);
    }
}
