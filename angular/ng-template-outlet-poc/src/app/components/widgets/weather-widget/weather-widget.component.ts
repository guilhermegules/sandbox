import { Component, inject, OnInit } from '@angular/core';
import { WidgetActionService } from '../widget-action.service';
import { WidgetStateService } from '../widget-state.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  standalone: true,
  providers: [WidgetActionService, WidgetStateService],
})
export class WeatherWidgetComponent {
  state = inject(WidgetStateService);
  action = inject(WidgetActionService);
}
