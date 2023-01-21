import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  list(): Course[] {
    return [
      {
        _id: '1',
        name: 'Angular',
        category: 'Front-end',
      },
    ];
  }
}
