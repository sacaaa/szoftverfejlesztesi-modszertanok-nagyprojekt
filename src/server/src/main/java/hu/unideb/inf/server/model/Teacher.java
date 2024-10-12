package hu.unideb.inf.server.model;

import com.fasterxml.jackson.annotation.*;
import hu.unideb.inf.server.model.base.BaseEntity;
import hu.unideb.inf.server.model.enums.Title;
import hu.unideb.inf.server.model.users.School;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.List;
import java.util.OptionalDouble;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "school_teacher",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "school_id"))
    @JsonBackReference(value = "school-teachers")
    private List<School> schools;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "teacher-teacherSubject")
    private List<TeacherSubjectAtSchool> subjectAtSchools;

    /**
     * Calculates the average rating for the teacher based on all associated reviews.
     *
     * @return the average rating as a Double, or null if there are no reviews.
     */
    @Transient
    @JsonProperty("avg_rating")
    public Double getAvgRating() {
        if (subjectAtSchools == null || subjectAtSchools.isEmpty()) {
            return null;
        }
        OptionalDouble avg = subjectAtSchools.stream()
                .filter(ts -> ts.getReviewsReceived() != null && !ts.getReviewsReceived().isEmpty())
                .flatMap(ts -> ts.getReviewsReceived().stream())
                .mapToInt(Review::getRating)
                .average();
        return avg.isPresent() ? avg.getAsDouble() : null;
    }

    /**
     * Returns a list of school IDs associated with the teacher.
     *
     * @return a list of school IDs as a List of Long, or null if there are no schools.
     */
    @Transient
    @JsonProperty("school_ids")
    public List<Long> getSchoolIds() {
        if (schools == null || schools.isEmpty()) {
            return null;
        }
        return schools.stream()
                .map(School::getId)
                .toList();
    }

}
