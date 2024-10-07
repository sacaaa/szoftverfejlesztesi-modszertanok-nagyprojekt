package hu.unideb.inf.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.enums.Title;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    @Enumerated(EnumType.STRING)
    private Title title;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    @Email
    private String email;

//    @ElementCollection
//    private Set<Long> subjectAtSchools = new HashSet<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "teacher-teacherSubject")
    private List<TeacherSubjectAtSchool> subjectAtSchools;

}
