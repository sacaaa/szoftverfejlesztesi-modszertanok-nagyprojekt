package hu.unideb.inf.server.controller;

import hu.unideb.inf.server.service.impl.ReviewService;
import hu.unideb.inf.server.service.impl.SchoolService;
import hu.unideb.inf.server.service.impl.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private SchoolService schoolService;

    @GetMapping
    public ResponseEntity<Map<String, String>> getData() {
        var teacherCount = teacherService.getAllTeachers().size();
        var reviewCount = reviewService.getAllReviews().size();
        var schoolCount = schoolService.getAllSchools().size();

        return ResponseEntity.ok(Map.of(
                "teacherCount", formatCount(150),
                "reviewCount", formatCount(reviewCount),
                "schoolCount", formatCount(schoolCount)
        ));
    }

    private String formatCount(int count) {
        if (count < 10) {
            return String.valueOf(count);
        }
        int magnitude = (int) Math.pow(10, (int) Math.log10(count));
        int roundedValue = (count / magnitude) * magnitude;
        return roundedValue + "+";
    }

}
