import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomDogListComponent } from './containers/random-dog-list/random-dog-list.component';

const routes: Routes = [
  {
    path: '',
    component: RandomDogListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsRoutingModule {}
