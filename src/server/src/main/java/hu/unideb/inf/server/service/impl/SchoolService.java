package hu.unideb.inf.server.service.impl;

import hu.unideb.inf.server.model.users.School;
import hu.unideb.inf.server.repository.SchoolRepository;
import hu.unideb.inf.server.service.ISchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolService implements ISchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    @Override
    public List<School> getAllSchools() {
        return schoolRepository.findAll();
    }

    @Override
    public Optional<School> getSchoolById(Long id) {
        return schoolRepository.findById(id);
    }

}
