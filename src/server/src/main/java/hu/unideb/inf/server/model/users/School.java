package hu.unideb.inf.server.model.users;

import com.fasterxml.jackson.annotation.*;
import hu.unideb.inf.server.model.Address;
import hu.unideb.inf.server.model.Teacher;
import hu.unideb.inf.server.model.base.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "schools")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class School extends User {

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
    @JsonManagedReference(value = "school-students")
    private List<Student> students;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "school_teacher",
            joinColumns = @JoinColumn(name = "school_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private List<Teacher> teachers;

}

