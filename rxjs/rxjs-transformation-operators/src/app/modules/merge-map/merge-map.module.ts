import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MergeMapRoutingModule } from './merge-map-routing.module';
import { MergeMapSandboxComponent } from './components/merge-map-sandbox/merge-map-sandbox.component';


@NgModule({
  declarations: [
    MergeMapSandboxComponent
  ],
  imports: [
    CommonModule,
    MergeMapRoutingModule
  ]
})
export class MergeMapModule { }
