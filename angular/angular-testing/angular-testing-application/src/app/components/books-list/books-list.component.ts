import { BookModel } from 'src/app/models/book/book.model';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  bookMock1: BookModel = new BookModel(
    'A Philosophy of Software Design',
    'https://images-na.ssl-images-amazon.com/images/I/51t2s-WNb3L._SX258_BO1,204,203,200_.jpg',
    'It would be interesting to distinguish design principles that apply to all paradigms from those that apply to particular paradigms. But one of the merits of A Philosophy of Software Design\' is that it is concise (178 pages) and broadening its scope would undoubtedly make it bigger.',
    35.0,
    30,
    'Tech',
    'IT'
  );
  bookMock2: BookModel = new BookModel(
    'Clean Code',
    'https://www.javascriptmasters.com.br/images/posts/clean-code-1-introducao/clean-code-capa-ingles.jpg',
    'Robert Cecil Martin, popularly known as Uncle Bob, is an American software engineer and instructor. He is best known for being one of the authors of the Agile Manifesto and for developing several software design principles. He was also the editor-in-chief of C++ Report magazine and served as the first chairman of the Agile Alliance.',
    90.0,
    100,
    'Tech',
    'IT'
  );
  books: BookModel[] = [this.bookMock1, this.bookMock2];
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
