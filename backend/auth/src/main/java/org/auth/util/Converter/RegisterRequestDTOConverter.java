package org.auth.util.Converter;

import org.auth.model.User;
import org.auth.dto.RegisterRequestDTO;

public class RegisterRequestDTOConverter implements Converter<RegisterRequestDTO, User> {

    @Override
    public User convert(RegisterRequestDTO from) {
        if (from == null)
        {
            return null;
        }
        User user = new User();
        user.setUsername(from.getUsername());
        user.setEmail(from.getEmail());
        user.setPassword(from.getPassword());
        return user;
    }
}
