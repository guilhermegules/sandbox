import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

@Component({
  selector: 'app-weather-custom-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-custom-action.component.html',
  styleUrls: ['./weather-custom-action.component.scss'],
})
export class WeatherCustomActionComponent {
  constructor(
    @Inject(WeatherWidgetComponent)
    private weatherComponent: WeatherWidgetComponent
  ) {}

  public onClick(): void {
    this.weatherComponent.action.reload();
    this.weatherComponent.action.copy();
  }
}
