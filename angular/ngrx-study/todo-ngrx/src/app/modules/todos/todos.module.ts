import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { todoReducerHandler } from './store/todo.reducer';
import { TodoEditModalComponent } from './components/todo-edit-modal/todo-edit-modal.component';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, TodoEditModalComponent],
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
    MatDialogModule,
  ],
})
export class TodosModule {}
