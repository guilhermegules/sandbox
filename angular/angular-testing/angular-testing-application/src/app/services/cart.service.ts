import { environment } from './../../environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import { BookModel } from './../models/book/book.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private emitToCart = new Subject<any>();
  addEmmited$ = this.emitToCart.asObservable();

  constructor(
    private database: AngularFirestore,
    private http: HttpClient
  ) {}

  query() {
    return this.database.collection('/cart').valueChanges();
  }

  addToCart(book: any) {
    const item = this.database.collection<BookModel>('/cart').add(book.getData());
    this.emitToCart.next(item);
    return item;
  }

  emitChange(book: BookModel) {
    this.emitToCart.next(book);
  }

  getAllItemsOnCart() {
    return this.http.get(environment.apiUrl);
  }
}
