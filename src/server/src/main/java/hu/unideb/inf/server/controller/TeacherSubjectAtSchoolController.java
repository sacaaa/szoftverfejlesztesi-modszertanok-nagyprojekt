package hu.unideb.inf.server.controller;

import hu.unideb.inf.server.model.TeacherSubjectAtSchool;
import hu.unideb.inf.server.service.impl.TeacherSubjectAtSchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teacher-subject-at-school")
public class TeacherSubjectAtSchoolController {

    @Autowired
    private TeacherSubjectAtSchoolService teacherSubjectAtSchoolService;

    @GetMapping
    public List<TeacherSubjectAtSchool> getAllTeacherSubjectAtSchools() {
        return teacherSubjectAtSchoolService.getAllTeacherSubjectAtSchools();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherSubjectAtSchool> getTeacherSubjectAtSchoolById(@PathVariable Long id) {
        return teacherSubjectAtSchoolService.getTeacherSubjectAtSchoolById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
