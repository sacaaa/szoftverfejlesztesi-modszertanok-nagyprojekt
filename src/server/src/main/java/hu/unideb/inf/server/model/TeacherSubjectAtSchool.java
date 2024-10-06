package hu.unideb.inf.server.model;

import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.users.School;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teacher_subject_at_school")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherSubjectAtSchool extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @JoinColumn(name = "teacher_id", nullable = false)
    private Long teacher;

    @JoinColumn(name = "subject_id", nullable = false)
    private Long subject;

    @JoinColumn(name = "school_id", nullable = false)
    private Long school;

    @ElementCollection
    private Set<Long> reviewsReceived = new HashSet<>();

}
