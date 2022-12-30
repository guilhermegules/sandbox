import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Injector, Input, TemplateRef } from '@angular/core';
import { WidgetActionService } from '../widget-action.service';
import { WidgetStateService } from '../widget-state.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  standalone: true,
  providers: [WidgetActionService, WidgetStateService],
  imports: [NgTemplateOutlet],
})
export class WeatherWidgetComponent {
  @Input()
  public headerTemplate!: TemplateRef<any>;

  @Input()
  public contentTemplate!: TemplateRef<WidgetStateService>;

  @Input()
  public actionTemplate!: TemplateRef<any>;

  public state = inject(WidgetStateService);
  public action = inject(WidgetActionService);
  public injector = inject(Injector);
}
