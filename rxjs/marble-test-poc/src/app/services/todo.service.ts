import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);

  get todos$() {
    return this.todos.asObservable();
  }

  get todosCount$() {
    return this.todos
      .asObservable()
      .pipe(map((todos) => todos.filter((todo) => !todo.completed).length));
  }

  addTodo(todo: Todo) {
    this.todos.next([...this.todos.value, todo]);
  }
}
