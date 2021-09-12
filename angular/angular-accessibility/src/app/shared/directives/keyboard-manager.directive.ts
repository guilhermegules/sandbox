import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';

import { ArrowDirectionEnum, KeyboardKeysEnum } from '../enums/keyboard.enum';
import { KeyboardManagedItemDirective } from './keyboard-managed-item.directive';

@Directive({
  selector: '[appKeyboardManager]',
})
export class KeyboardManagerDirective {
  @ContentChildren(KeyboardManagedItemDirective)
  public items: QueryList<KeyboardManagedItemDirective> = null;

  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKeysEnum.ARROW_UP:
        this.moveFocus(ArrowDirectionEnum.RIGHT).focus();
        break;
      case KeyboardKeysEnum.ARROW_DOWN:
        this.moveFocus(ArrowDirectionEnum.LEFT).focus();
        break;
      case KeyboardKeysEnum.ARROW_LEFT:
        this.moveFocus(ArrowDirectionEnum.LEFT).focus();
        break;
      case KeyboardKeysEnum.ARROW_RIGHT:
        this.moveFocus(ArrowDirectionEnum.RIGHT).focus();
        break;
    }
  }

  public moveFocus(
    direction: ArrowDirectionEnum
  ): KeyboardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex((item) => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];

    if (targetElementFocus) return targetElementFocus;

    return direction === ArrowDirectionEnum.LEFT
      ? items[items.length - 1]
      : items[0];
  }
}
