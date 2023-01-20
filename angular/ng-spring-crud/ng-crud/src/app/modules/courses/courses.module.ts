import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, CoursesRoutingModule, MatTableModule],
})
export class CoursesModule {}
