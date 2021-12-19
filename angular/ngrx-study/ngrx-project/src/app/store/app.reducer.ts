import { Action, createAction, createReducer, on } from '@ngrx/store';

export interface CountStore {
  count: number;
}

export const initialState = 0;

export const increment = createAction('[App] increment one for counter');

export const decrement = createAction('[App] decrement one for counter');

export const reset = createAction('[App] resets the counter');

const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (_) => 0)
);

export function appReducer(state: any, action: Action) {
  return counterReducer(state, action);
}
