package com.study.javatdd.modules.courses.repositories;

import com.study.javatdd.modules.courses.entities.Course;

public interface ICourseRepository {
    public Course save(Course course);
    public Course findByName(String name);
}
