package hu.unideb.inf.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.users.School;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
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

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @JsonBackReference(value = "teacher-teacherSubject")
    private Teacher teacher;

    @Column(name = "teacher_id", nullable = false, updatable = false, insertable = false)
    private Long teacherId;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "school_id")
    @JsonBackReference(value = "school-teachers")
    private School school;

    @Column(name = "school_id", nullable = false, updatable = false, insertable = false)
    private Long schoolId;

    @OneToMany(mappedBy = "teacherSubjectAtSchool", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "teacherSubject-reviews")
    private List<Review> reviewsReceived;

}
