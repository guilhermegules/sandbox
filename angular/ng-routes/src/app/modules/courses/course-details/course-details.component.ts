import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { Course } from '../models/courses.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  public id!: string;

  public course!: Course | null;

  private destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params) => this.coursesService.getCourse(params['id']))
      )
      .subscribe((course) => {
        if (!course) {
          this.router.navigate(['/', 'not-found']);
        }

        this.course = course;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
