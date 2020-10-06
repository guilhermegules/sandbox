import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { AppRoutingModule } from './app-routing.module';
import { GameBoardComponent } from './components/game-board/game-board.component'

@NgModule({
  declarations: [
    AppComponent,
    QuizCardComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatCardModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
