import { Injectable } from '@angular/core';
import { of, delay, fromEvent, mergeMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class MergeMapService {
  public mergeMapWithSaveMethod(event: MouseEvent) {
    const saveLocation = (location: {
      y: number;
      x: number;
      timestamp: number;
    }) => of(location).pipe(delay(500));

    return of(event).pipe(
      mergeMap((event) =>
        saveLocation({
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
        })
      )
    );
  }

  public ajaxWithPlaceholderApi(event: MouseEvent) {
    const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

    return of(event).pipe(mergeMap(() => ajax.getJSON(API_URL)));
  }
}
