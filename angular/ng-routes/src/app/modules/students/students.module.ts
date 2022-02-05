import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsService } from './services/students.service';
import { StudentsGuard } from './guards/students.guard';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsDetailsComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, FormsModule],
  exports: [StudentsComponent, StudentsFormComponent, StudentsDetailsComponent],
  providers: [StudentsService, StudentsGuard],
})
export class StudentsModule {}
