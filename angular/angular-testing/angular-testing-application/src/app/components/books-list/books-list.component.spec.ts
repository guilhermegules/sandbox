import { DiscountFormatterPipe } from './../../pipes/discount-formatter.pipe';
import { BookComponent } from './../book/book.component';
import { TestingModule } from './../../testing/testing.module';
import { CartServiceMock, cartList } from './../../mock/cart.service.mock';
import { CartService } from './../../services/cart.service';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksListComponent, BookComponent, DiscountFormatterPipe],
      imports: [TestingModule],
      providers: [{ provide: CartService, useClass: CartServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('Books Cart', () => {
  //   it('should display the cart after rendering', fakeAsync(() => {
  //     fixture.detectChanges();
  //     expect(component.cart).toEqual(cartList);
  //   }));
  // });
});
