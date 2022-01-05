import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.scss'],
})
export class TodoEditModalComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
