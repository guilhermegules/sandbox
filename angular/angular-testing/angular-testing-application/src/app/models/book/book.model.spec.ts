import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BookModel } from './book.model';
import * as faker from 'faker';

describe('BookModel', () => {

  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upvotes: number;
  let book: BookModel;

  afterEach(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    image = faker.image.image();
    title = faker.lorem.words();
    description = faker.lorem.sentence();
    price = faker.commerce.price();
    upvotes = faker.random.number();
    book = new BookModel(image, title, description, price, upvotes);

    let storage = {};

    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string): string => {
        return storage[key] || null;
      }
    );

    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete storage[key];
      }
    );

    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string): void => {
        storage[key] = value;
      }
    );

    spyOn(window.localStorage, 'clear').and.callFake((): void => {
      storage = {};
    });
  });

  it('should have the save method working', () => {
    book.save();
    const bookFromStorage: BookModel = BookModel.find(book.title);
    expect(book).toEqual(bookFromStorage);
  });

  it('should have the find method working', () => {
    book.save();
    const bookFromStorage: BookModel = BookModel.find(book.title);
    expect(book).toEqual(bookFromStorage);
  });

  it('should have the destroy method working', () => {
    book.save();
    book.destroy();
    const bookFromStorage: BookModel = BookModel.find(book.title);
    expect(bookFromStorage).not.toBeTruthy();
    expect(bookFromStorage).toEqual(null);
  });

  it('should localStorage working', () => {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  it('should have a valid model', () => {
    expect(book.image).toEqual(image);
    expect(book.title).toEqual(title);
    expect(book.description).toEqual(description);
    expect(book.price).toEqual(price);
    expect(book.upvotes).toEqual(upvotes);
  });
});
