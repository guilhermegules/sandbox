import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MergeMapService } from '../../services/merge-map.service';

@Component({
  selector: 'app-merge-map-sandbox',
  templateUrl: './merge-map-sandbox.component.html',
  styleUrls: ['./merge-map-sandbox.component.scss'],
})
export class MergeMapSandboxComponent {
  public clickValue!: {
    y: number;
    x: number;
    timestamp: number;
  };

  constructor(private mergeMapService: MergeMapService) {}

  public onClick(event: MouseEvent) {
    this.mergeMapService
      .mergeMapWithSaveMethod(event)
      .pipe(take(1))
      .subscribe((value) => {
        this.clickValue = { ...value };
      });
  }

  public onSubmit(event: MouseEvent) {
    this.mergeMapService
      .ajaxWithPlaceholderApi(event)
      .pipe(take(1))
      .subscribe((value) => {
        console.log(value);
      });
  }
}
