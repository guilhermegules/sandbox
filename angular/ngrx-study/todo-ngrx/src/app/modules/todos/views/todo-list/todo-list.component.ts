import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
import { TodoEditModalComponent } from '../../components/todo-edit-modal/todo-edit-modal.component';
import { Todo } from '../../models/todo.model';
import { TodoStore } from '../../store/todo.reducer';
import { edit, remove } from '../../store/todos.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todos$: Observable<Todo[]>;

  constructor(
    private store: Store<{ todos: TodoStore }>,
    private dialog: MatDialog
  ) {
    this.todos$ = this.store.select('todos').pipe(pluck('todos'));
  }

  public removeTodo(id: number) {
    this.store.dispatch(remove({ id }));
  }

  public editTodo(id: number) {
    const dialogRef = this.dialog.open(TodoEditModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.store.dispatch(edit({ id, ...result }));
    });
  }
}
