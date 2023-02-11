import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, debounceTime, first } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Todo } from '../models/todo.model';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('value', () => {
    it('should emit a b and c without marbles', (done) => {
      service.value$.subscribe((value) => {
        expect(value).toBe('a');
        done();
      });

      service.setValue('a');
    });
    it('should emit a b and c with marbles', () => {
      testScheduler.run((helpers) => {
        const { expectObservable, cold } = helpers;
        const expected = '-a';

        cold(expected).subscribe(() => {
          service.setValue('a');
        });

        expectObservable(service.value$).toBe(expected, {
          a: 'a',
        });
      });
    });
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
              userId: 1,
            },
          ],
        };

        service.addTodo({
          completed: true,
          id: 1,
          title: 'First todo',
          userId: 1,
        });

        service.todos$.subscribe((todos) => {
          value$.next(todos);
        });

        expectObservable(value$).toBe(expected, value);
      });
    });
  });
});
