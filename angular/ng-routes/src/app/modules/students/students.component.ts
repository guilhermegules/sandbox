import { Component, OnInit } from '@angular/core';

import { Student } from './models/students.model';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public students: Student[] = [];

  constructor(private studentsService: StudentsService) {}

  public ngOnInit(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }
}
