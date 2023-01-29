import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { AppMaterialModule } from '../../shared/modules/app-material/app-material.module';
import { CategoryModule } from '../../shared/pipes/category/category.module';
import { CoursesFormComponent } from './containers/courses-form/courses-form.component';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesListComponent, CoursesFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    ErrorDialogComponent,
    CategoryModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
