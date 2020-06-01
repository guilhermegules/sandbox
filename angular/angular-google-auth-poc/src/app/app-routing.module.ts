import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SuperSecretComponent } from './components/super-secret/super-secret.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
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
