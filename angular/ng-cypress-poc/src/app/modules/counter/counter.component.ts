import { CounterService } from './services/counter.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  public counter$!: Observable<number>;

  constructor(private counterService: CounterService) {}

  public ngOnInit(): void {
    this.counter$ = this.counterService.counter$;
  }

  public addValue(): void {
    this.counterService.add(1);
  }

  public subtractValue(): void {
    this.counterService.subtract(1);
  }

  public resetValue(): void {
    this.counterService.reset();
  }
}
