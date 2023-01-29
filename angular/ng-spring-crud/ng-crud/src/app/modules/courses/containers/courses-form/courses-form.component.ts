import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseCategory } from '../../enums/category.enum';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent {
  public form: FormGroup;
  public readonly CATEGORY = CourseCategory;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.fb.group({
      name: '',
      category: '',
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
