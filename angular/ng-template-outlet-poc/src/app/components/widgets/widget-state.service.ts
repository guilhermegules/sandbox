import { Injectable } from '@angular/core';
import { WeatherData } from './weather-widget/weather.model';

@Injectable()
export class WidgetStateService {
  public data: WeatherData = {
    temperature: 20,
    windSpeed: 5,
    skyCondition: 'sunny',
  };

  public lastUpdatedAt = new Date();
}
