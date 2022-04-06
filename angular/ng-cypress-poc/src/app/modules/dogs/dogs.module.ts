import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { RandomDogListComponent } from './containers/random-dog-list/random-dog-list.component';
import { DogBreedListComponent } from './containers/dog-breed-list/dog-breed-list.component';

@NgModule({
  declarations: [RandomDogListComponent, DogBreedListComponent],
  imports: [CommonModule, DogsRoutingModule],
})
export class DogsModule {}
