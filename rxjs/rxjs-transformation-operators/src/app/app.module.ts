import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConcatMapModule } from './modules/concat-map/concat-map.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ConcatMapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
