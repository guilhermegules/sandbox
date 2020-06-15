import { BookModel } from './../../models/book/book.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: BookModel[] = [];
  constructor() {}

  ngOnInit(): void {
    this.books = BookModel.query();
  }
}
