import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { KeyboardManagerDirective } from './directives/keyboard-manager.directive';

@NgModule({
  declarations: [ButtonGroupComponent, KeyboardManagerDirective],
  imports: [CommonModule],
  exports: [ButtonGroupComponent, KeyboardManagerDirective],
})
export class SharedModule {}
