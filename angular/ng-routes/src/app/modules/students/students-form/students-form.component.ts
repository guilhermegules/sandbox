import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { Student } from '../models/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit, OnDestroy {
  public student!: Student;

  private destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) =>
          this.studentsService.getStudentById(Number(params['id']))
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe((student) => {
        if (!student) return;

        this.student = student;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
