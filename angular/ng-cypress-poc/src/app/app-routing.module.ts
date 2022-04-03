import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./modules/counter/counter.module').then((m) => m.CounterModule),
  },
  {
    path: 'flickr',
    loadChildren: () =>
      import('./modules/flickr/flickr.module').then((m) => m.FlickrModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
