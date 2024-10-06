package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.Subject;

import java.util.List;
import java.util.Optional;

public interface ISubjectService {
    List<Subject> getAllSubjects();

    Optional<Subject> getSubjectById(Long id);
}
