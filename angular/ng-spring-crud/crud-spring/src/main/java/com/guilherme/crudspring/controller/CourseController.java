package com.guilherme.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guilherme.crudspring.model.Course;
import com.guilherme.crudspring.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

  private final CourseRepository courseRepository;

  @GetMapping
  public List<Course> list() {
    return this.courseRepository.findAll();
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Course create(@RequestBody Course course) {
    return this.courseRepository.save(course);
  }

  @GetMapping("/{courseId}")
  public ResponseEntity<Course> findById(@PathVariable Long courseId) {
    return this.courseRepository.findById(courseId)
      .map(course -> ResponseEntity.ok().body(course))
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{courseId}")
  public ResponseEntity<Course> update(@PathVariable Long courseId, @RequestBody Course course) {
    return this.courseRepository.findById(courseId)
      .map(courseRecord -> {
        courseRecord.setName(course.getName());
        courseRecord.setCategory(course.getCategory());
        var updated = this.courseRepository.save(courseRecord);
        return ResponseEntity.ok().body(updated);
      })
      .orElse(ResponseEntity.notFound().build());
  }
}
