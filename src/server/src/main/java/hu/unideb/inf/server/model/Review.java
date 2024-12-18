package hu.unideb.inf.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.users.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonBackReference(value = "student-reviews")
    private Student student;

    @Column(name = "student_id", nullable = false, updatable = false, insertable = false)
    private Long studentId;

    @ManyToOne
    @JoinColumn(name = "teacher_subject_at_school_id")
    @JsonBackReference(value = "teacherSubject-reviews")
    private TeacherSubjectAtSchool teacherSubjectAtSchool;

    @Column(name = "teacher_subject_at_school_id", nullable = false, updatable = false, insertable = false)
    private Long teacherSubjectAtSchoolId;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}