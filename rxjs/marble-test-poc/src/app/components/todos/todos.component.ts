import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  public todos$ = this.todoService.todos$;
  public todosCount$ = this.todoService.todosCount$;
  public todoTitle = new FormControl('');

  constructor(private todoService: TodoService) {}

  addTodo() {
    const todo: Todo = {
      id: Math.random() * 100000,
      completed: false,
      title: this.todoTitle.value ?? '',
    };
    this.todoService.addTodo(todo);
  }
}
