package com.study.javatdd.modules.courses.services;

import com.study.javatdd.modules.courses.entities.Course;
import com.study.javatdd.modules.courses.repositories.ICourseRepository;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    private ICourseRepository courseRepository;

    public CourseService(ICourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course create(Course course) {
        Course existedCourse = this.courseRepository.findByName(course.getName());

        if (existedCourse != null) {
            throw new Error("Course already exists!");
        }

        return this.courseRepository.save(course);
    }
}
