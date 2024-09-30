package hu.unideb.inf.server.model;

import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.enums.Title;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher extends BaseEntity {

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

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TeacherSubjectAtSchool> subjectAtSchools = new HashSet<>();

    public String getTitle() {
        return title.getTitle();
    }

}
