import { TestingModule } from './../../testing/testing.module';
import { FormChildren } from './../../models/form/form';
import { InitDirective } from './../../directives/init.directive';
import { TreeComponent } from './../tree/tree.component';
import { element } from 'protractor';
import { RouterTestingModule } from '@angular/router/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as faker from 'faker';
import { BookEditComponent } from './book-edit.component';
import { By } from '@angular/platform-browser';
import { BookModel } from 'src/app/models/book/book.model';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditComponent, TreeComponent, InitDirective],
      imports: [TestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  afterEach(() => {
    if (component.book) {
      component.book.destroy();
    }
  });

  function fillTheForm(image, title, description, price) {
    component.bookEditForm.controls.image.setValue(image);
    component.bookEditForm.controls.title.setValue(title);
    component.bookEditForm.controls.description.setValue(description);
    component.bookEditForm.controls.price.setValue(price);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null field in reactive form', () => {
    expect(component.bookEditForm.value).toEqual({
      image: null,
      title: null,
      description: null,
      price: null,
    });
  });

  it('should have submit button disabled if required fields are not filled in', fakeAsync(() => {
    const spy = spyOn(component, 'onSubmit');
    fillTheForm(null, null, null, null);
    const button = nativeElement.querySelector('#reactiveSubmitButton');
    button.dispatchEvent(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
    expect(button.hasAttribute('disabled')).toBe(true);
  }));

  it('should have submit enabled if required fields are filled in', fakeAsync(() => {
    const spy = spyOn(component, 'onSubmit').and.callThrough();

    fillTheForm(
      faker.image.image(),
      faker.lorem.sentence(),
      faker.lorem.paragraph(),
      faker.commerce.price()
    );

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();
    const bookFromStorage = BookModel.find(component.book.title);
    expect(bookFromStorage).toEqual(component.book);
  }));
});
