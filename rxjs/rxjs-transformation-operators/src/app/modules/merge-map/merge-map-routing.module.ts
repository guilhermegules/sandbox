import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MergeMapSandboxComponent } from './components/merge-map-sandbox/merge-map-sandbox.component';

const routes: Routes = [
  {
    path: '',
    component: MergeMapSandboxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergeMapRoutingModule {}
