import { Injectable } from '@angular/core';
import { of, concatMap, delay, mergeMap, zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConcatMapService {
  public concatMapDelayExample() {
    const source = of(2000, 1000);

    // Will map values from source into inner observable
    // when complete emit result and move to next
    const concatMap$ = source.pipe(
      concatMap((delayValue) =>
        of(`Delayed by: ${delayValue}ms (concatMap)`).pipe(delay(delayValue))
      )
    );

    const mergeMap$ = source.pipe(
      mergeMap((delayValue) =>
        of(`Delayed by: ${delayValue}ms (mergeMap)`).pipe(delay(delayValue))
      )
    );

    return zip([concatMap$, mergeMap$]);
  }

  public mapToPromiseExample() {
    const source = of('Hello', 'Goodbye');

    const stringPromise = (value: string) =>
      new Promise<string>((resolve) => resolve(`${value} World!`));

    return source.pipe(concatMap(stringPromise));
  }
}
