import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './components/widgets/weather-widget/weather-widget.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, WeatherWidgetComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
