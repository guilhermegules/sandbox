import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private counter = new BehaviorSubject(0);

  get counter$() {
    return this.counter.asObservable();
  }

  public add(number: number) {
    this.counter.next(this.counter.value + number);
  }

  public subtract(number: number) {
    this.counter.next(this.counter.value - number);
  }

  public reset() {
    this.counter.next(0);
  }
}
