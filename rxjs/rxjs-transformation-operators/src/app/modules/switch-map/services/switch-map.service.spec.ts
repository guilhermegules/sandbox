import { TestBed } from '@angular/core/testing';

import { SwitchMapService } from './switch-map.service';

describe('SwitchMapService', () => {
  let service: SwitchMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
