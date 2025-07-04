package org.auth.Service;

import org.auth.Dto.RegisterRequestDTO;
import org.auth.Model.User;
import org.auth.Repository.UserRepository;
import org.auth.Util.Converter.Converter;
import org.auth.Util.Converter.RegisterRequestDTOConverter;
import org.auth.Util.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must be longer than 5 characters");
        }
        if (!request.getPassword().equals(request.getRepeatPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords don't match");
        }
        if (!EmailValidator.validate(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect email");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already taken");
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
        long time = 7L * 24 * 60 * 60;
        ResponseCookie cookie = ResponseCookie.from("auth", jwtService.create(time, user.getId()))
                .httpOnly(false)
                .path("/")
                .maxAge(time)
                .build();
        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Successfully registered");
    }
}
