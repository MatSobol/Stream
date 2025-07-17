package org.auth.Util.Converter;

import org.auth.Model.User;
import org.auth.Dto.RegisterRequestDTO;

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
