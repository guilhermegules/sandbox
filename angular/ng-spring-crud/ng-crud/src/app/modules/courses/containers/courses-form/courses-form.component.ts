import { Component, OnInit } from '@angular/core';
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
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: '',
      category: '',
    });
  }

  onSubmit(): void {
    this.coursesService.save(this.form.value).subscribe({
      next: (course) => {
        console.log(course);
      },
      error: () => {
        this.onError();
      },
    });
  }

  onCancel(): void {}

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', 'x', {
      duration: 5000,
    });
  }
}
