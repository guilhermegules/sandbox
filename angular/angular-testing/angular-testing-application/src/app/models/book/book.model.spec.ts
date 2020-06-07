import { BookInterface, BookModel } from './book.model';
import * as faker from 'faker';

describe('BookModel', () => {
  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upvotes: number;

  beforeEach(() => {
    image = faker.image.image();
    title = faker.lorem.words();
    description = faker.lorem.sentences();
    price = faker.commerce.price();
    upvotes = faker.random.number();
  });

  it('has a valid model', () => {
    const book = new BookModel(image, title, description, price, upvotes);
    expect(book.image).toEqual(image);
    expect(book.title).toEqual(title);
    expect(book.description).toEqual(description);
    expect(book.price).toEqual(price);
    expect(book.upvotes).toEqual(upvotes);
  });
});
