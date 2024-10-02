package hu.unideb.inf.server.repository;

import hu.unideb.inf.server.model.TeacherSubjectAtSchool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherSubjectAtSchoolRepository extends JpaRepository<TeacherSubjectAtSchool, Long> {
}
