import { BookModel } from './../../models/book/book.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: BookModel;
  @Output() addToCart: EventEmitter<BookModel> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  sendToCart(): void {
    this.addToCart.emit(this.book);
  }

  votesCounter(): number {
    return this.book.upvotes;
  }

  upvote(): number {
    return this.book.upvotes++;
  }
}
