import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { YesNoValueEnum } from './core/enum/button-group.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  public submit(): void {
    console.log(this.formGroup.value);
  }

  public initForm(): void {
    this.formGroup = this.fb.group({
      answer: [null],
      answerSemantic: [null],
    });
  }
}
