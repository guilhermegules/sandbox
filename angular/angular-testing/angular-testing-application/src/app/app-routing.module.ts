import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './components/book/book.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  { path: 'books/:title', component: BookComponent },
  { path: 'books/:title/edit', component: BookEditComponent },
  { path: 'books', component: BooksListComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
