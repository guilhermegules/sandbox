import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as faker from 'faker';

import { BookModel } from './../../models/book/book.model';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.sentence(),
      faker.lorem.paragraph(),
      1000.99,
      0
    );
    component.book = book;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
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

  it('upvote invokes the component function', () => {
    const spy = spyOn(component, 'upvote');
    const button = nativeElement.querySelector('button.upvote');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
