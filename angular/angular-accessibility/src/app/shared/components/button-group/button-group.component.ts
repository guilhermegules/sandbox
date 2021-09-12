import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { YesNoValueEnum } from 'src/app/core/enum/button-group.enum';
import { UniqueIdService } from '../../services/unique-id.service';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // Register a component of CSA before component exist
      useExisting: forwardRef(() => ButtonGroupComponent),
    },
  ],
})
export class ButtonGroupComponent implements ControlValueAccessor {
  @Output()
  public valueChange = new EventEmitter<string>();

  @Input()
  public value: string = null;

  @Input()
  public label = '';

  public readonly OPTIONS = YesNoValueEnum;
  public id: string = null;

  constructor(uniqueIdService: UniqueIdService) {
    this.id = uniqueIdService.generateUUIDWithPrefix('button-group');
  }

  public onChange = (value: string) => {};
  public onTouched = () => {};

  public activate(value: string): void {
    this.writeValue(value);
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(this.value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}
}
