import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BookModel } from 'src/app/models/book/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  book: BookModel;
  activeForm = 'reactive';

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.params.subscribe(response => {
      this.book = BookModel.find(response.title);
      if (this.book === null) {
        this.book = new BookModel('', '', '', 0);
      }
    });
  }

  initForm(): void {
    this.bookEditForm = this.formBuilder.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(255)]],
      price: [null, [Validators.pattern(/\d/), Validators.required]]
    });
  }

  onSubmit(): void {
    const bookData = this.prepareSaveBook();
    this.book = new BookModel(bookData.image, bookData.title, bookData.description, bookData.price);
    this.book.save();
  }

  prepareSaveBook() {
    const formModel = this.bookEditForm.value;
    return formModel;
  }

}
