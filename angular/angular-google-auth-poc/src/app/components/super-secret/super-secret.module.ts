import { SuperSecretRoutingModule } from './super-secret-routing.module';
import { SuperSecretComponent } from './super-secret.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SuperSecretComponent],
  imports: [CommonModule, SuperSecretRoutingModule],
})
export class SuperSecretModule {}
