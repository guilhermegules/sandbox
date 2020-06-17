import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { TreeComponent } from './components/tree/tree.component';
import { InitDirective } from './directives/init.directive';
import { DiscountFormatterPipe } from './pipes/discount-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BooksListComponent,
    BookEditComponent,
    TreeComponent,
    InitDirective,
    DiscountFormatterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
