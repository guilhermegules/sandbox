import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesService } from './services/courses.service';
import { CoursesGuard } from './guards/courses.guard';

@NgModule({
  declarations: [CoursesComponent, CourseDetailsComponent],
  imports: [CommonModule, CoursesRoutingModule],
  exports: [CoursesComponent, CourseDetailsComponent],
  providers: [CoursesService, CoursesGuard],
})
export class CoursesModule {}
