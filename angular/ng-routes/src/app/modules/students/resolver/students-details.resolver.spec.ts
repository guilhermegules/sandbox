import { TestBed } from '@angular/core/testing';

import { StudentsDetailsResolver } from './students-details.resolver';

describe('StudentsDetailsResolver', () => {
  let resolver: StudentsDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StudentsDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
