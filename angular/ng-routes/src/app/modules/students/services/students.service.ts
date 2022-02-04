import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Student } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students: Array<Student> = [
    { id: 1, name: 'Student 01', email: 'student01@gmail.com' },
    { id: 2, name: 'Student 02', email: 'student02@gmail.com' },
    { id: 3, name: 'Student 03', email: 'student03@gmail.com' },
  ];

  public getStudents() {
    return of(this.students);
  }

  public getStudentById(id: number) {
    return of(this.students.find((student) => student.id === id) ?? null);
  }
}
