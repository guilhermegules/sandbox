import { Injectable } from '@angular/core';
import { v1 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UniqueIdService {
  public generateUUIDWithPrefix(prefix: string) {
    return `${prefix}-${this.generateUUID()}`;
  }

  private generateUUID(): string {
    return v1();
  }
}
