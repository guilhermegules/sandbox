import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseCategory } from '../../enums/category.enum';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent implements OnInit {
  public form = this.fb.group({
    name: '',
    category: '',
    _id: '',
  });
  public readonly CATEGORY = CourseCategory;

  constructor(
    private fb: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.patchValue({
      category: course.category,
      name: course.name,
      _id: course._id,
    });
  }

  onSubmit(): void {
    this.coursesService.save(this.form.value).subscribe({
      next: (course) => {
        this.onSuccess(course.name);
      },
      error: () => {
        this.onError();
      },
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', 'x', {
      duration: 5000,
    });
  }

  private onSuccess(courseName: string): void {
    this.snackBar.open(`Curso ${courseName} salvo com sucesso!`, 'x', {
      duration: 5000,
    });
    this.location.back();
  }
}
