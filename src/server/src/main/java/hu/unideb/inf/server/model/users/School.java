package hu.unideb.inf.server.model.users;

import hu.unideb.inf.server.model.Address;
import hu.unideb.inf.server.model.TeacherSubjectAtSchool;
import hu.unideb.inf.server.model.base.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "schools")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class School extends User {

    @Column(name = "user_id", nullable = false)
    private String userId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @Column(name = "institution_id", nullable = false)
    private String institutionId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TeacherSubjectAtSchool> teachers = new HashSet<>();

}
