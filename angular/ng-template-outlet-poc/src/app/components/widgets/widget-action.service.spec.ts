import { TestBed } from '@angular/core/testing';

import { WidgetActionService } from './widget-action.service';

describe('WidgetActionService', () => {
  let service: WidgetActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
