import { environment } from './../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscountFormatterPipe } from './../pipes/discount-formatter.pipe';
import { CartServiceMock } from './../mock/cart.service.mock';
import { CartService } from './../services/cart.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {
  TestBed,
  async,
  fakeAsync,
  tick,
  inject,
  ComponentFixture,
} from '@angular/core/testing';
import { AppComponent } from './../app.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book',
  template: '<div>book</div>',
})
class BookComponent {}

@Component({
  selector: 'app-book-edit',
  template: '<div>book edit</div>',
})
class BookEditComponent {}

@Component({
  selector: 'app-book-list',
  template: '<div>book edit</div>',
})
class BookListComponent {}

describe('Routing', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const routerStub: any = {
      navigate() {},
      routerState: {},
    };

    spyOn(routerStub, 'navigate');
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent,
        BookComponent,
        BookEditComponent,
        BookListComponent,
        DiscountFormatterPipe,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'books/:title', component: BookComponent },
          { path: 'books/:title/edit', component: BookEditComponent },
          { path: 'books', component: BookListComponent },
          { path: 'books/new', component: BookEditComponent },
        ]),
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock },
        { provide: environment, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should navigate to the default route', () => {
    inject(
      [Router, Location],
      fakeAsync((router: Router, location: Location) => {
        router.initialNavigation();
        tick();
        router.navigate(['books']);
        tick();
        expect(location.path()).toEqual('/books');
      })
    );
  });

  it('should navigate to book edit', inject(
    [Router, Location],
    fakeAsync((router: Router, location: Location) => {
      router.navigate(['book', 1, 'edit']);
      tick();
      expect(location.path()).toEqual('/books/1/edit');
    })
  ));

  it('should navigate to book edit', inject(
    [Router, Location],
    fakeAsync((router: Router, location: Location) => {
      router.navigate(['book', 1, 'edit']);
      tick();
      expect(location.path()).toEqual('/books/1/edit');
    })
  ));
});
