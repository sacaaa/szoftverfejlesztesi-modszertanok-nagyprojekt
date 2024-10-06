package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.users.Student;

import java.util.List;
import java.util.Optional;

public interface IStudentService {
    List<Student> getAllStudents();

    Optional<Student> getStudentById(Long id);
}
