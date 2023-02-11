package com.study.javatdd.modules.courses.repositories;

import com.study.javatdd.modules.courses.entities.Course;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CourseInMemoryRepository implements ICourseRepository {
    private List<Course> courses;

    public CourseInMemoryRepository() {
        this.courses = new ArrayList<>();
    }

    @Override
    public Course save(Course course) {
        this.courses.add(course);
        course.setId(UUID.randomUUID());
        return course;
    }

    @Override
    public Course findByName(String name) {
        return this.courses.stream()
                .filter(course -> course.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
}
