import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListService } from './services/list.service';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ListRoutingModule, HttpClientModule],
  providers: [ListService],
})
export class ListModule {}
