package org.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = false)
    private String role = "user";

    @Column(length = 20, nullable = false)
    private String username;

    @Column(length = 40, nullable = false, unique = true)
    private String email;

    @Column(length = 97, nullable = false)
    private String password;

    @Column(name = "failed_login_attempts", nullable = false)
    private Integer failedLoginAttempts = 0;

    @Column(name = "verified_email", nullable = false)
    private Boolean verifiedEmail = false;

    @Column(name = "email_verification_token", length = 128)
    private String emailVerificationToken;

    @Column(name = "password_reset_token", length = 128)
    private String passwordResetToken;

    @Column(name = "password_reset_token_expires_at")
    private LocalDateTime passwordResetTokenExpiresAt;
}
