import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { todoReducerHandler } from './store/todo.reducer';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    StoreModule.forFeature('todos', { todos: todoReducerHandler }, {}),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class TodosModule {}
