import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = this.coursesService.list();
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {}
}
