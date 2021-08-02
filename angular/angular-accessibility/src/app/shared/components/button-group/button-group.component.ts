import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YesNoValueEnum } from 'src/app/core/enum/button-group.enum';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent {
  @Output()
  public valueChange = new EventEmitter<string>();

  @Input()
  public value: string = null;

  @Input()
  public label = '';

  public readonly OPTIONS = YesNoValueEnum;

  public activate(value: string): void {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}
