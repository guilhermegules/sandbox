import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConcatMapComponent } from './modules/concat-map/components/concat-map.component';

const routes: Routes = [
  {
    path: '',
    component: ConcatMapComponent,
  },
  {
    path: 'exhaust-map',
    loadChildren: () =>
      import('./modules/exhaust-map/exhaust-map.module').then(
        (m) => m.ExhaustMapModule
      ),
  },
  {
    path: 'merge-map',
    loadChildren: () =>
      import('./modules/merge-map/merge-map.module').then(
        (m) => m.MergeMapModule
      ),
  },
  {
    path: 'switch-map',
    loadChildren: () =>
      import('./modules/switch-map/switch-map.module').then(
        (m) => m.SwitchMapModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
