import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogBreedListComponent } from './containers/dog-breed-list/dog-breed-list.component';

import { RandomDogListComponent } from './containers/random-dog-list/random-dog-list.component';

const routes: Routes = [
  {
    path: '',
    component: RandomDogListComponent,
  },
  {
    path: 'breeds',
    component: DogBreedListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsRoutingModule {}
