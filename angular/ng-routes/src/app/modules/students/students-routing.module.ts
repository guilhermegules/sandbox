import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsDeactivateGuard } from './guards/students-deactivate.guard';
import { StudentsGuard } from './guards/students.guard';
import { StudentsDetailsResolver } from './resolver/students-details.resolver';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivateChild: [StudentsGuard],
    children: [
      { path: 'add', component: StudentsFormComponent, canDeactivate: [StudentsDeactivateGuard] },
      { path: ':id', component: StudentsDetailsComponent, resolve: { student: StudentsDetailsResolver } },
      { path: ':id/edit', component: StudentsFormComponent, canDeactivate: [StudentsDeactivateGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
