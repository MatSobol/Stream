package org.auth.service;

import org.auth.Constants;
import org.auth.dto.RegisterRequestDTO;
import org.auth.model.User;
import org.auth.repository.UserRepository;
import org.auth.util.Converter.Converter;
import org.auth.util.Converter.RegisterRequestDTOConverter;
import org.auth.util.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    Converter<RegisterRequestDTO, User> registerRequestDTOConverter = new RegisterRequestDTOConverter();

    @Autowired
    public RegisterService(final PasswordEncoder passwordEncoder, final UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    private ResponseEntity<String> isUserValid(RegisterRequestDTO request) {
        if (request.getPassword().length() < 6) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("Password must be longer than 5 characters");
        }
        if (!request.getPassword().equals(request.getRepeatPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("Passwords don't match");
        }
        if (!EmailValidator.validate(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("Incorrect email");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("Email already taken");
        }
        return null;
    }

    public ResponseEntity<String> register(RegisterRequestDTO request) {
        ResponseEntity<String> isValid = isUserValid(request);
        if (isValid != null) {
            return isValid;
        }
        String password = passwordEncoder.encode(request.getPassword());
        request.setPassword(password);
        User user = userRepository.save(registerRequestDTOConverter.convert(request));
        ResponseCookie cookie = ResponseCookie.from("Authorization", jwtService.create(Constants.JWT_MAX_AGE, user.getId())).httpOnly(false).path("/").maxAge(Constants.JWT_MAX_AGE).build();
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Successfully registered");
    }
}
