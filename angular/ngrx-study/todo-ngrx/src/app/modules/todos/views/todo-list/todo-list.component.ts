import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodoStore } from '../../store/todo.reducer';
import { remove } from '../../store/todos.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: TodoStore }>) {
    this.todos$ = this.store.select('todos').pipe(pluck('todos'));
  }

  public removeTodo(id: number) {
    this.store.dispatch(remove({ id }));
  }
}
