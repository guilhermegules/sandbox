import { TestBed } from '@angular/core/testing';

import { StudentsDeactivateGuard } from './students-deactivate.guard';

describe('StudentsDeactivateGuard', () => {
  let guard: StudentsDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudentsDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
