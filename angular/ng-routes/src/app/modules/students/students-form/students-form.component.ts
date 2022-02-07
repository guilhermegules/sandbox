import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { FormDeactivate } from 'src/app/interfaces/form-deactivate';

import { Student } from '../models/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit, OnDestroy, FormDeactivate {
  public student!: Student;

  private formChanged = false;

  private destroyed$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private studentsService: StudentsService) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => this.studentsService.getStudentById(Number(params['id']))),
        takeUntil(this.destroyed$),
      )
      .subscribe(student => {
        if (!student) return;

        this.student = student;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onInput() {
    this.formChanged = true;
  }

  public canDeactivate() {
    if (this.formChanged) {
      // eslint-disable-next-line no-restricted-globals
      return confirm('Are you sure you want to leave this page?');
    }

    return true;
  }
}
