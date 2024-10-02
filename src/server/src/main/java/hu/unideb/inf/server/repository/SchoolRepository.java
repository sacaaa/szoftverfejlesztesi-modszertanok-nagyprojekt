package hu.unideb.inf.server.repository;

import hu.unideb.inf.server.model.users.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {
}
