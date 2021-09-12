import { Directive, HostListener } from '@angular/core';

import { KeyboardKeysEnum } from '../enums/keyboard.enum';

@Directive({
  selector: '[appKeyboardManager]',
})
export class KeyboardManagerDirective {
  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKeysEnum.ARROW_UP:
        console.log('up');
        break;
      case KeyboardKeysEnum.ARROW_DOWN:
        console.log('down');
        break;
      case KeyboardKeysEnum.ARROW_LEFT:
        console.log('left');
        break;
      case KeyboardKeysEnum.ARROW_RIGHT:
        console.log('right');
        break;
    }
  }
}
