package hu.unideb.inf.server.service.impl;

import hu.unideb.inf.server.model.TeacherSubjectAtSchool;
import hu.unideb.inf.server.repository.TeacherSubjectAtSchoolRepository;
import hu.unideb.inf.server.service.ITeacherSubjectAtSchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherSubjectAtSchoolService implements ITeacherSubjectAtSchoolService {

    @Autowired
    private TeacherSubjectAtSchoolRepository teacherSubjectAtSchoolRepository;

    @Override
    public List<TeacherSubjectAtSchool> getAllTeacherSubjectAtSchools() {
        return teacherSubjectAtSchoolRepository.findAll();
    }

    @Override
    public Optional<TeacherSubjectAtSchool> getTeacherSubjectAtSchoolById(Long id) {
        return teacherSubjectAtSchoolRepository.findById(id);
    }

}
