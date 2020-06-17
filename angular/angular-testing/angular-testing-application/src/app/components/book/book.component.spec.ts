import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as faker from 'faker';

import { CartServiceMock } from './../../mock/cart.service.mock';
import { CartService } from './../../services/cart.service';
import { TestingModule } from './../../testing/testing.module';
import { BookModel } from './../../models/book/book.model';
import { BookComponent } from './book.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'discount' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;
  book = new BookModel(
    faker.image.imageUrl(),
    faker.lorem.sentences(),
    faker.lorem.paragraph(),
    faker.commerce.price(),
    faker.random.number()
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent, MockPipe],
      imports: [TestingModule],
      providers: [{ provide: CartService, useClass: CartServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the book image', () => {
    const image = nativeElement
      .querySelector('.book-image')
      .getAttribute('src');
    expect(image).toEqual(book.image);
  });

  it('should get the alt for image', () => {
    const image = nativeElement
      .querySelector('.book-image')
      .getAttribute('alt');
    expect(image).toEqual(book.description);
  });

  it('should show the book title', () => {
    const title = nativeElement.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show the book description', () => {
    const description = nativeElement.querySelector('.book-description')
      .innerHTML;
    expect(description).toEqual(`Description: ${book.description}`);
  });

  it('should show the book price', () => {
    const price = nativeElement.querySelector('.book-price').innerHTML;
    expect(price).toEqual('$1,000.99');
  });

  // Example of xit, is a pending test
  // xit('pending', () => {
  //   const any: any = jasmine.any(Number);
  // });

  it('should set correct number of upvotes', () => {
    const votes = component.votesCounter();
    expect(component.votesCounter()).toEqual(votes);
    expect(component.votesCounter()).toBeGreaterThan(votes - 1);
    expect(component.votesCounter()).not.toEqual(votes + 1);
    expect(component.votesCounter()).toBeLessThan(votes + 1);
  });

  it('should upvote invokes the component function', () => {
    const spy = spyOn(component, 'upvote');
    const button = nativeElement.querySelector('button.upvote');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit addToCart event', () => {
    component.addToCart.subscribe((event) => {
      expect(event).toEqual(component.book);
    });
    component.sendToCart();
  });

  it('should call to a function sendToCart wehn clicked', () => {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeElement.querySelector('button.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe((event) => {
      expect(event).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should call to a function sendToCart when clicked', () => {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeElement.querySelector('button.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
