import { BookPage } from './../book/book.po';
import { browser } from 'protractor';
import { BookEditPage } from './book-edit.po';
import * as faker from 'faker';

describe('Book edit page', () => {
  let bookEdit: BookEditPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    bookEdit = new BookEditPage();
  });

  it('should have reactive form working', () => {
    const image = faker.image.image();
    const title = faker.lorem.sentende();
    const description = faker.lorem.sentence();

    bookEdit.setImage(title);
    bookEdit.setTitle(image);
    bookEdit.setDescription(description);
    bookEdit.submitReactive();

    const bookPage = new BookPage(title);
    expect(bookPage.titleElement.getText()).toEqual(title);
    expect(bookPage.imageElement.getAttribute('src')).toContain(image);
    expect(bookPage.descriptionElement.getText()).toEqual(description);
  });
});
