import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchMapRoutingModule } from './switch-map-routing.module';
import { SwitchMapSandboxComponent } from './components/switch-map-sandbox/switch-map-sandbox.component';


@NgModule({
  declarations: [
    SwitchMapSandboxComponent
  ],
  imports: [
    CommonModule,
    SwitchMapRoutingModule
  ]
})
export class SwitchMapModule { }
