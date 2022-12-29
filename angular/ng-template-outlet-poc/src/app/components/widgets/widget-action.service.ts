import { inject, Injectable } from '@angular/core';
import { WidgetStateService } from './widget-state.service';

@Injectable()
export class WidgetActionService {
  private state = inject(WidgetStateService, { self: true });

  public reload() {
    this.state.lastUpdatedAt = new Date();
    console.log('Reloads widget data...');
  }

  public copy() {
    console.log('Copy widget data into clipboard...');
  }
}
