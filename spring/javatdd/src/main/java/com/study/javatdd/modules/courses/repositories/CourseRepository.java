package com.study.javatdd.modules.courses.repositories;

import com.study.javatdd.modules.courses.entities.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseRepository implements ICourseRepository {
    @Autowired
    CourseJPARepository courseJPARepository;

    @Override
    public Course save(Course course) {
        return this.courseJPARepository.save(course);
    }

    @Override
    public Course findByName(String name) {
        return this.courseJPARepository.findByName(name);
    }
}

