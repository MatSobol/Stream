package org.auth.service;

import org.auth.Constants;
import org.auth.dto.LoginRequestDTO;
import org.auth.model.User;
import org.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private static final String FAILED_LOGIN_RESPONSE = "Incorrect email or password";

    @Autowired
    private JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public LoginService(final PasswordEncoder passwordEncoder, final UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public ResponseEntity<String> login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(FAILED_LOGIN_RESPONSE);
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(FAILED_LOGIN_RESPONSE);
        }
        ResponseCookie cookie = ResponseCookie.from("Authorization", jwtService.create(Constants.JWT_MAX_AGE, user.getId()))
                .httpOnly(false)
                .path("/")
                .maxAge(Constants.JWT_MAX_AGE)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .contentType(MediaType.TEXT_PLAIN)
                .body("Successfully logged in");
    }
}
