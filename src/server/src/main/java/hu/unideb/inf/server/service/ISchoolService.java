package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.users.School;

import java.util.List;
import java.util.Optional;

public interface ISchoolService {

    List<School> getAllSchools();

    Optional<School> getSchoolById(Long id);

}
