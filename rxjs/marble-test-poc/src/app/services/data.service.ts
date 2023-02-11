import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private value = new Subject<string>();
  private todos = new BehaviorSubject<Todo[]>([]);

  get value$() {
    return this.value.asObservable();
  }

  get todos$() {
    return this.todos.asObservable();
  }

  addTodo(todo: Todo) {
    this.todos.next([...this.todos.value, todo]);
  }

  setValue(value: string) {
    this.value.next(value);
  }
}
