import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Course } from 'src/app/models/courses.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];

  private destroyed$ = new Subject<void>();

  constructor(private coursesService: CoursesService) {}

  public ngOnInit(): void {
    this.coursesService
      .getCourses()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
