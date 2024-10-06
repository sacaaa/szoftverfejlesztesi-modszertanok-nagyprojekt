package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.Teacher;

import java.util.List;
import java.util.Optional;

public interface ITeacherService {
    List<Teacher> getAllTeachers();

    Optional<Teacher> getTeacherById(Long id);
}
