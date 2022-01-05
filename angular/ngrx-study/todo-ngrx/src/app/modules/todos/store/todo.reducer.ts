import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';

import { add, edit, remove } from './todos.actions';

export interface TodoStore {
  todos: Todo[];
}

export const initialState: Todo[] = [];

const todoReducer = createReducer(
  initialState,
  on(add, (state, props) => [
    ...state,
    { id: props.id, title: props.title, description: props.description },
  ]),
  on(remove, (state, props) => state.filter((item) => item.id !== props.id)),
  on(edit, (state, props) => [
    ...state.map((item) => {
      if (item.id === props.id) {
        return { ...props };
      }

      return item;
    }),
  ])
);

export function todoReducerHandler(state: any, action: Action) {
  return todoReducer(state, action);
}
