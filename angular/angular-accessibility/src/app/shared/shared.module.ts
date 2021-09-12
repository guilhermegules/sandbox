import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { KeyboardManagerDirective } from './directives/keyboard-manager.directive';
import { KeyboardManagedItemDirective } from './directives/keyboard-managed-item.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { ButtonGroupSemanticComponent } from './components/button-group-semantic/button-group-semantic.component';

@NgModule({
  declarations: [
    ButtonGroupComponent,
    ButtonGroupSemanticComponent,
    KeyboardManagerDirective,
    KeyboardManagedItemDirective,
    DisableControlDirective,
  ],
  imports: [CommonModule],
  exports: [
    ButtonGroupComponent,
    ButtonGroupSemanticComponent,
    KeyboardManagerDirective,
    KeyboardManagedItemDirective,
    DisableControlDirective,
  ],
})
export class SharedModule {}
