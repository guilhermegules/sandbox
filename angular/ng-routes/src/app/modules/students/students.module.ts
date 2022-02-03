import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsDetailsComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule],
  exports: [StudentsComponent, StudentsFormComponent, StudentsDetailsComponent],
})
export class StudentsModule {}
