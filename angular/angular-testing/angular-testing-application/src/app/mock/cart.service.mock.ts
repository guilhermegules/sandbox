import { BookModel } from './../models/book/book.model';
import { Subject, of } from 'rxjs';
import * as faker from 'faker';

export let cartList = [];

for (let i = 0; i < 10; i++) {
  cartList.push({
    image: faker.image.image(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    price: 1234.45,
    upvotes: 0,
  });
}

export class CartServiceMock {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();

  constructor() {}

  addToCartMock(item: BookModel): BookModel {
    return item;
  }

  query() {
    return of(cartList);
  }
}
