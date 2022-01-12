import { TestBed } from '@angular/core/testing';

import { BodyInjectorService } from './body-injector.service';

describe('BodyInjectorService', () => {
  let service: BodyInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
