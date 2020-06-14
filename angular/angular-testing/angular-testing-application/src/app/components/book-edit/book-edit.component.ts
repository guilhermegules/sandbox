import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  NgForm,
  ValidatorFn,
} from '@angular/forms';
import { BookModel } from 'src/app/models/book/book.model';
import { FormOptions } from 'src/app/models/form/form';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  bookEditDynamic: FormGroup;
  book: BookModel;
  activeForm = 'reactive';
  @ViewChild(NgForm) templateForm: NgForm;
  question: FormOptions = {
    children: [
      {
        type: 'input',
        minLength: 3,
        maxLength: 10,
        required: true,
        label: 'Title',
        paramName: 'title',
      },
      {
        type: 'input',
        minLength: 10,
        maxLength: 255,
        required: true,
        label: 'Description',
        paramName: 'description',
      },
      {
        type: 'input',
        required: true,
        label: 'Image',
        paramName: 'image',
      },
      {
        type: 'input',
        required: true,
        label: 'Price',
        paramName: 'price',
      },
      {
        type: 'checkbox',
        required: true,
        label: 'Fantasy',
        paramName: 'genre',
        value: 'fantasy',
      },
      {
        type: 'checkbox',
        required: true,
        label: 'Non-fiction',
        paramName: 'genre',
        value: 'non_fiction',
      },
      {
        type: 'select',
        required: true,
        label: 'Category',
        paramName: 'category',
        options: [
          {
            label: 'Home & Garden',
            paramName: 'home_and_garden',
          },
          {
            label: 'Programing',
            paramName: 'programing',
          },
        ],
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initDynamicForm();
    this.activatedRoute.params.subscribe((response) => {
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
      price: [null, [Validators.pattern(/\d/), Validators.required]],
    });
  }

  initDynamicForm(): void {
    const dynamicFormConfig = this.prepareForm(this.question);
    this.bookEditDynamic = this.formBuilder.group(dynamicFormConfig);
  }

  prepareForm(question) {
    const formStructure = {};
    for (const element of question.children) {
      const validators: ValidatorFn[] = [];
      if (element.required) {
        validators.push(Validators.required);
      }
      if (element.minlength) {
        validators.push(Validators.minLength(element.minlength));
      }
      if (element.maxlength) {
        validators.push(Validators.maxLength(element.maxlength));
      }
      formStructure[element.paramName] = [null, validators];
    }
    return formStructure;
  }

  submitTemplateForm() {
    console.log('submiting form');
    this.book.save();
  }

  onSubmit(): void {
    const bookData = this.prepareSaveBook();
    this.book = new BookModel(
      bookData.image,
      bookData.title,
      bookData.description,
      bookData.price
    );
    this.book.save();
  }

  prepareSaveBook() {
    const formModel = this.bookEditForm.value;
    return formModel;
  }
}
