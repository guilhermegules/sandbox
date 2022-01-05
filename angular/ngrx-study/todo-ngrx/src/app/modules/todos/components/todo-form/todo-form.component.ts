import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodoStore } from '../../store/todo.reducer';
import { add } from '../../store/todos.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public form!: FormGroup;

  constructor(private store: Store<TodoStore>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public addTask() {
    if (this.form.invalid) return;

    this.store.dispatch(
      add({
        id: Math.floor(Math.random() * 10000),
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      })
    );
  }

  private initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
