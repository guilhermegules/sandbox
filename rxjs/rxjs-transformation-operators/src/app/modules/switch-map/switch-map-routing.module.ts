import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwitchMapSandboxComponent } from './components/switch-map-sandbox/switch-map-sandbox.component';

const routes: Routes = [
  {
    path: '',
    component: SwitchMapSandboxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchMapRoutingModule {}
