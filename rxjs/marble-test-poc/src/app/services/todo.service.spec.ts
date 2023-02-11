import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Todo } from '../models/todo.model';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTodo', () => {
    it('should add todo on list', () => {
      testScheduler.run((helpers) => {
        const { expectObservable } = helpers;
        const expected = '(a)';
        const value$ = new BehaviorSubject<Todo[]>([]);
        const value = {
          a: [
            {
              completed: true,
              id: 1,
              title: 'First todo',
            },
          ],
        };

        service.addTodo({
          completed: true,
          id: 1,
          title: 'First todo',
        });

        service.todos$.subscribe((todos) => {
          value$.next(todos);
        });

        expectObservable(value$).toBe(expected, value);
      });
    });
  });
});
