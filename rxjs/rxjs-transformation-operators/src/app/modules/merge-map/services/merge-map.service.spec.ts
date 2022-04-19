import { TestBed } from '@angular/core/testing';

import { MergeMapService } from './merge-map.service';

describe('MergeMapService', () => {
  let service: MergeMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergeMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
