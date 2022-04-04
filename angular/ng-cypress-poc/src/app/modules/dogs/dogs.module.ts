import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { RandomDogListComponent } from './containers/random-dog-list/random-dog-list.component';

@NgModule({
  declarations: [RandomDogListComponent],
  imports: [CommonModule, DogsRoutingModule],
})
export class DogsModule {}
