import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Student } from '../models/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {
  public student!: Student;

  private destroyed$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private studentsService: StudentsService, private router: Router) {}

  public ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      console.log(data);
      if (!data) return;

      this.student = data['student'];
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public editStudent() {
    this.router.navigate(['/students', this.student.id, 'edit']);
  }
}
