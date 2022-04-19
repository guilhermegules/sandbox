import { Component, OnInit } from '@angular/core';
import { ExhaustMapService } from '../../services/exhaust-map.service';

@Component({
  selector: 'app-exhaust-map-sandbox',
  templateUrl: './exhaust-map-sandbox.component.html',
  styleUrls: ['./exhaust-map-sandbox.component.scss'],
})
export class ExhaustMapSandboxComponent implements OnInit {
  public intervalList: number[] = [];

  constructor(private exhaustMapService: ExhaustMapService) {}

  public ngOnInit(): void {
    // Check the logs
    this.exhaustMapService.exhaustMapWithTwoIntervals();

    this.exhaustMapService.exhaustMapWithInterval().subscribe((value) => {
      this.intervalList.push(value);
    });
  }
}
