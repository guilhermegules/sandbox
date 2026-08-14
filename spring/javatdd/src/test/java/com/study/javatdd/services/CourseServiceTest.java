package com.study.javatdd.services;

import com.study.javatdd.modules.courses.entities.Course;
import com.study.javatdd.modules.courses.repositories.CourseInMemoryRepository;
import com.study.javatdd.modules.courses.services.CourseService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CourseServiceTest {

    @Test
    public void shouldBeAbleToCreateANewCourse() {
        Course course = new Course();
        course.setDescription("Course description test");
        course.setName("Course_name");
        course.setWorkload(100);

        CourseInMemoryRepository repository = new CourseInMemoryRepository();
        CourseService courseService = new CourseService(repository);
        Course createdCourse = courseService.create(course);

        assertNotNull(createdCourse.getId());
    }

    @Test
    public void shouldNotBeAbleToCreateIfExists() {
        Course course = new Course();
        course.setDescription("Not create course");
        course.setName("not_create_course");
        course.setWorkload(100);

        CourseInMemoryRepository repository = new CourseInMemoryRepository();
        CourseService courseService = new CourseService(repository);

        Throwable error = assertThrows(Error.class, () -> {
            courseService.create(course);
            courseService.create(course);
        });

        assertEquals("Course already exists!", error.getMessage());
    }
}
