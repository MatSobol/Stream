package org.auth.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "password_tokens")
public class PasswordToken {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "token", length = 128)
    private String token;
}
