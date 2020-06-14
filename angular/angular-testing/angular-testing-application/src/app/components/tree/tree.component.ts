import { FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() questions: any;
  @Input() form: FormGroup;
  @Input() objectToFill: any;

  @ViewChild('input') input: TemplateRef<any>;
  @ViewChild('checkbox') checkbox: TemplateRef<any>;
  @ViewChild('empty') empty: TemplateRef<any>;
  @ViewChild('select') select: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}

  resolveTemplate(question) {
    if (question === null) {
      return this.empty;
    }
    const templateName: string = question.type;
    return {
      input: this.input,
      checkbox: this.checkbox,
      select: this.select
    }[templateName];
  }
}
