import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-switch-map-sandbox',
  templateUrl: './switch-map-sandbox.component.html',
  styleUrls: ['./switch-map-sandbox.component.scss'],
})
export class SwitchMapSandboxComponent implements OnInit {
  public numbers: number[] = [];

  public ngOnInit(): void {
    of(1, 2, 3)
      .pipe(switchMap((value) => of(value, value ** 2, value ** 3)))
      .subscribe((value) => this.numbers.push(value));
  }
}
