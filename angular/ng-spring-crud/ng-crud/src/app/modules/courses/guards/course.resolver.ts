import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    if (route.params && route.params['courseId']) {
      return this.coursesService.findById(route.params['courseId']);
    }

    return of({
      _id: '',
      name: '',
      category: '',
    });
  }
}
