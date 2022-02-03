import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Course } from '../../models/courses.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];

  public page = 0;

  private destroyed$ = new Subject<void>();

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.coursesService
      .getCourses()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((courses) => {
        this.courses = courses;
      });

    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params) => {
        this.page = Number(params['page']);
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public nextPage(): void {
    this.router.navigate(['courses'], {
      queryParams: {
        page: (this.page += 1),
      },
    });
  }

  public previousPage(): void {
    if (this.page === 1) return;

    this.router.navigate(['courses'], {
      queryParams: {
        page: (this.page -= 1),
      },
    });
  }
}
