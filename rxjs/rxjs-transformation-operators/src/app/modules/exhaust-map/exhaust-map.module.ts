import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExhaustMapRoutingModule } from './exhaust-map-routing.module';
import { ExhaustMapSandboxComponent } from './components/exhaust-map-sandbox/exhaust-map-sandbox.component';


@NgModule({
  declarations: [
    ExhaustMapSandboxComponent
  ],
  imports: [
    CommonModule,
    ExhaustMapRoutingModule
  ]
})
export class ExhaustMapModule { }
