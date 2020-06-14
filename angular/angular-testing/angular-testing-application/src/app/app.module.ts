import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { TreeComponent } from './components/tree/tree.component';
import { InitDirective } from './directives/init.directive';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BooksListComponent,
    BookEditComponent,
    TreeComponent,
    InitDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
