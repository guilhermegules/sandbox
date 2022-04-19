import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExhaustMapSandboxComponent } from './components/exhaust-map-sandbox/exhaust-map-sandbox.component';

const routes: Routes = [
  {
    path: '',
    component: ExhaustMapSandboxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExhaustMapRoutingModule {}
