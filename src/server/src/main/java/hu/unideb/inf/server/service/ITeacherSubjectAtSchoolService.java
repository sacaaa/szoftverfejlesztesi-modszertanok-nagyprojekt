package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.TeacherSubjectAtSchool;

import java.util.List;
import java.util.Optional;

public interface ITeacherSubjectAtSchoolService {
    List<TeacherSubjectAtSchool> getAllTeacherSubjectAtSchools();

    Optional<TeacherSubjectAtSchool> getTeacherSubjectAtSchoolById(Long id);
}
