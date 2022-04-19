import { TestBed } from '@angular/core/testing';

import { ExhaustMapService } from './exhaust-map.service';

describe('ExhaustMapService', () => {
  let service: ExhaustMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhaustMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
