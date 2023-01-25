import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesFormComponent } from './containers/courses-form/courses-form.component';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
  {
    path: 'new',
    component: CoursesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
