package hu.unideb.inf.server.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.unideb.inf.server.model.Review;
import hu.unideb.inf.server.model.Subject;
import hu.unideb.inf.server.model.Teacher;
import hu.unideb.inf.server.model.TeacherSubjectAtSchool;
import hu.unideb.inf.server.model.base.User;
import hu.unideb.inf.server.model.logger.MyLogger;
import hu.unideb.inf.server.model.users.School;
import hu.unideb.inf.server.model.users.Student;
import hu.unideb.inf.server.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;

@Component
public class DataLoader {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TeacherSubjectAtSchoolRepository teacherSubjectAtSchoolRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @PostConstruct
    public void load() {
        loadData("classpath:data/schools.json", School[].class, schoolRepository);
        loadData("classpath:data/students.json", Student[].class, studentRepository);
        loadData("classpath:data/subjects.json", Subject[].class, subjectRepository);
        loadData("classpath:data/teachers.json", Teacher[].class, teacherRepository);
        loadData("classpath:data/teacher_subject_at_schools.json", TeacherSubjectAtSchool[].class, teacherSubjectAtSchoolRepository);
        loadData("classpath:data/reviews.json", Review[].class, reviewRepository);
    }

    private <T> void loadData(String resourcePath, Class<T[]> clazz, JpaRepository<T, Long> repository) {
        Resource resource = resourceLoader.getResource(resourcePath);
        try {
            T[] objects = objectMapper.readValue(resource.getInputStream(), clazz);
            if (objects == null || objects.length == 0) {
                MyLogger.log.warn(String.format("Nem található objektum a(z) %s fájlban.", resourcePath));
                return;
            }
            if (User.class.isAssignableFrom(clazz.getComponentType())) {
                Arrays.stream(objects)
                        .forEach(user -> ((User) user)
                                .setPassword(passwordEncoder.encode(((User) user).getPassword())));

            }
            repository.saveAll(Arrays.asList(objects));
            MyLogger.log.info(String.format("%d objektum betöltve a(z) %s fájlból.", objects.length, resourcePath));
        } catch (IOException e) {
            MyLogger.log.error(String.format("Hiba történt a(z) %s fájl beolvasása közben.", resourcePath), e);
        }
    }

}
