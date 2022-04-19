import { Injectable } from '@angular/core';
import { interval, delay, take, merge, of, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExhaustMapService {
  public exhaustMapWithInterval = () => {
    const delayedInterval = interval(1000).pipe(delay(10), take(4));

    return merge(delayedInterval, of(true)).pipe(
      exhaustMap(() => interval(1000).pipe(take(5)))
    );
  };

  public exhaustMapWithTwoIntervals = () => {
    const firstInterval = interval(1000).pipe(take(10));
    const secondInterval = interval(1000).pipe(take(2));

    return firstInterval
      .pipe(
        exhaustMap((firstValue) => {
          console.log(`Emission corrected of first interval: ${firstValue}`);

          return secondInterval;
        })
      )
      .subscribe(console.log);
  };
}
