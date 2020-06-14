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
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
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

  it('should have dynamic form working', fakeAsync(() => {
    (component.activeForm = 'dynamicForm'), fixture.detectChanges();
    const form = component.bookEditDynamic;
    const elements = component.question.children;
    const object: any = {};
    for (const el of elements) {
      if (el.type === 'input') {
        const value = faker.lorem.sentence();
        form.get(el.paramName).setValue(value);
        object[el.paramName] = value;
      }
      if (el.type === 'select') {
        const option =
          el.options[Math.floor(Math.random() * el.options.length)];
        component.book[el.paramName] = option.paramName;
        fixture.detectChanges();
        object[el.paramName] = option.paramName;
      }
      if (el.type === 'checkbox') {
        form.controls[el.paramName].setValue(true);
        object[el.paramName] = true;
      }
    }
    const button = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement;
    button.click();
    const bookFromStorage = BookModel.find(object.title);
    expect<any>(bookFromStorage).toEqual(component.book);
  }));

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

  describe('Template driven form', () => {
    it('should have a title error if less then 3 symbols provided', fakeAsync(() => {
      component.activeForm = 'templateDriven';
      fixture.detectChanges();
      const form = component.templateForm.form;
      tick();
      form.setValue({
        title: 'te',
        image: 'http://test.com',
        description: 'none',
        price: 30,
      });
      form.controls.title.markAsTouched();
      fixture.detectChanges();
      expect(form.controls.title.errors).toBeTruthy();
      expect(nativeElement.querySelector('.title-group').textContent).toContain(
        'Title must be at least 3 characters long.'
      );
    }));

    it('should have price error if incorrect value provided', fakeAsync(() => {
      component.activeForm = 'templateDriven';
      fixture.detectChanges();
      const form = component.templateForm.form;
      tick();
      form.setValue({
        title: 'TEST',
        image: 'http://test.com',
        description: 'description',
        price: '$3333',
      });

      form.controls.title.markAsTouched();
      fixture.detectChanges();
      expect(form.controls.price.errors).toBeTruthy();
    }));
  });
});
