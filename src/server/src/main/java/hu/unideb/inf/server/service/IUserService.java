package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.base.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);
}
