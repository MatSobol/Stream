package org.auth.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    String username;
    String email;
    String password;
    String repeatPassword;
}
