package com.study.javatdd.modules.courses.controllers;

import com.study.javatdd.modules.courses.entities.Course;
import com.study.javatdd.modules.courses.repositories.CourseRepository;
import com.study.javatdd.modules.courses.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/")
    public Course create(@RequestBody Course course) {
        CourseService courseService = new CourseService(this.courseRepository);
        return courseService.create(course);
    }
}
