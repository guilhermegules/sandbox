import { BookModel } from './../../models/book/book.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  @Input() book: BookModel;

  constructor() {}

  ngOnInit(): void {}
}
