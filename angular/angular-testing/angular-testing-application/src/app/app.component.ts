import { BookModel } from './models/book/book.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-testing';

  public cart: BookModel[] = [];
  public book: BookModel = new BookModel(
    'https://www.javascriptmasters.com.br/images/posts/clean-code-1-introducao/clean-code-capa-ingles.jpg',
    'Robert C. Martin',
    'Robert Cecil Martin, popularly known as "Uncle Bob", is an American software engineer and instructor. He is best known for being one of the authors of the Agile Manifesto and for developing several software design principles. He was also the editor-in-chief of C++ Report magazine and served as the first chairman of the Agile Alliance.',
    40,
    0
  );

  addToCart(book: BookModel) {
    this.cart.push(book);
  }
}
