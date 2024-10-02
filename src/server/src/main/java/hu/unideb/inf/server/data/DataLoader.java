package hu.unideb.inf.server.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.unideb.inf.server.model.users.School;
import hu.unideb.inf.server.model.users.Student;
import hu.unideb.inf.server.repository.SchoolRepository;
import hu.unideb.inf.server.repository.StudentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.JpaRepository;
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
    private SchoolRepository schoolRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PostConstruct
    public void load() {
        loadData("classpath:data/schools.json", School[].class, schoolRepository);
        // loadData("classpath:data/students.json", Student[].class, studentRepository);
    }

    private <T> void loadData(String resourcePath, Class<T[]> clazz, JpaRepository<T, Long> repository) {
        Resource resource = resourceLoader.getResource(resourcePath);
        try {
            T[] objects = objectMapper.readValue(resource.getInputStream(), clazz);
            repository.saveAll(Arrays.asList(objects));
            System.out.println(objects.length + " objektum betöltve a(z) " + resourcePath + " fájlból.");
        } catch (IOException e) {
            System.err.println("Hiba történt a " + resourcePath + " fájl betöltése során: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
