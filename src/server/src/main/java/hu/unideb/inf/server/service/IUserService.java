package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.base.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface IUserService extends UserDetailsService {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);
}
