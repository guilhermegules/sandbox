import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
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
        const expected = 'a';
        const value = {
          a: [
            {
              completed: false,
              id: 1,
              title: 'First todo',
            },
            {
              completed: false,
              id: 2,
              title: 'Second todo',
            },
          ],
        };

        service.addTodo({
          completed: false,
          id: 1,
          title: 'First todo',
        });

        service.addTodo({
          completed: false,
          id: 2,
          title: 'Second todo',
        });

        expectObservable(service.todos$).toBe(expected, value);
      });
    });
    it('should add todo on list with done', (done) => {
      service.addTodo({ completed: true, id: 1, title: 'First todo' });
      service.todos$.subscribe((todos) => {
        expect(todos).toEqual([
          { completed: true, id: 1, title: 'First todo' },
        ]);
        done();
      });
    });
  });

  describe('todosCount$', () => {
    it('should get the count of todos when is incomplete', () => {
      testScheduler.run((helpers) => {
        const { expectObservable } = helpers;
        const expected = 'a';
        const value = {
          a: 1,
        };
        const todo1 = {
          completed: true,
          id: 1,
          title: 'First todo',
        };
        const todo2 = {
          completed: false,
          id: 2,
          title: 'Second todo',
        };

        service.addTodo(todo1);
        service.addTodo(todo2);

        expectObservable(service.todosCount$).toBe(expected, value);
      });
    });
    it('should get the count of todos when is incomplete with done', (done) => {
      const todo1 = {
        completed: true,
        id: 1,
        title: 'First todo',
      };
      const todo2 = {
        completed: false,
        id: 2,
        title: 'Second todo',
      };

      service.addTodo(todo1);
      service.addTodo(todo2);

      service.todosCount$.subscribe((count) => {
        expect(count).toBe(1);
        done();
      });
    });
  });
});
