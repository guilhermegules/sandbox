import { AuthGuard } from './guards/auth.guard';
import { SuperSecretComponent } from './components/super-secret/super-secret.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    loadChildren: () =>
      import('./errors/errors.module').then((module) => module.ErrorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
