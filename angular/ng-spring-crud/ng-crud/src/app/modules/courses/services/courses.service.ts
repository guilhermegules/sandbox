import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/api/courses';

  constructor(private http: HttpClient) {}

  list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API);
  }

  save(record: Partial<Course>): Observable<Course> {
    if (record._id) return this.update(record);

    return this.create(record);
  }

  findById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.API}/${courseId}`);
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.API, record);
  }

  private update(record: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.API}/${record._id}`, record);
  }
}
