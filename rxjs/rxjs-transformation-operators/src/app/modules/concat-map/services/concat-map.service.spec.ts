import { TestBed } from '@angular/core/testing';

import { ConcatMapService } from './concat-map.service';

describe('ConcatMapService', () => {
  let service: ConcatMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcatMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
