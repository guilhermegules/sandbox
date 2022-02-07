import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Student } from '../models/students.model';
import { StudentsService } from '../services/students.service';

@Injectable()
export class StudentsDetailsResolver implements Resolve<Student | null> {
  constructor(private studentsService: StudentsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student | null> {
    const { id } = route.params;

    return this.studentsService.getStudentById(Number(id));
  }
}
