import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Course } from '../models/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular',
    },
    {
      id: 2,
      name: 'Java',
    },
  ];

  constructor() {}

  public getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  public getCourse(id: number): Observable<Course | null> {
    return of(this.courses.find((course) => course.id === Number(id)) ?? null);
  }
}
