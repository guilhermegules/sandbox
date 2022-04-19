import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConcatMapService } from '../services/concat-map.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss'],
})
export class ConcatMapComponent implements OnInit, OnDestroy {
  public example1: string[] = [];
  public example2: string[] = [];

  private subscription = new Subscription();

  constructor(private concatMapService: ConcatMapService) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.concatMapService
        .concatMapDelayExample()
        .subscribe(([concatMapValue, mergeMapValue]) => {
          this.example1.push(concatMapValue, mergeMapValue);
        })
    );

    this.subscription.add(
      this.concatMapService.mapToPromiseExample().subscribe((value) => {
        this.example2.push(value);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
