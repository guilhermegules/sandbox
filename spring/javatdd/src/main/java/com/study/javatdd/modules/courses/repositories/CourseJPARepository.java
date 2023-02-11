package com.study.javatdd.modules.courses.repositories;

import com.study.javatdd.modules.courses.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CourseJPARepository extends JpaRepository<Course, UUID> {
    public Course findByName(String name);
}
