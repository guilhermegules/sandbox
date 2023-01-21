import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../../shared/modules/app-material/app-material.module';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, CoursesRoutingModule, AppMaterialModule],
})
export class CoursesModule {}
