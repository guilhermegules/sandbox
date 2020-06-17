import { BookModel } from 'src/app/models/book/book.model';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: BookModel[] = [];
  cart: BookModel[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.query().subscribe((items: BookModel[]) => {
      this.cart = items;
    });

    this.cartService.addEmmited$.subscribe((item) => {
      this.cart.push(item);
    });
  }

  addToCart(book: BookModel) {
    this.cart.push(book);
  }
}
