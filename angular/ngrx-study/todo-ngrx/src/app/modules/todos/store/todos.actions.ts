import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const add = createAction(
  '[Todo Form] Add one task on list',
  props<Todo>()
);

export const remove = createAction(
  '[Todo List] Remove one item from list',
  props<{ id: number }>()
);
