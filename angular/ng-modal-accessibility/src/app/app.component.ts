import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fade } from './shared/animations/fade';
import { ModalRef } from './shared/modal/models/modal-ref';
import { ModalService } from './shared/modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  @ViewChild('modal')
  public modalTemplateRef!: TemplateRef<any>;

  public modalRef!: ModalRef;
  public form!: FormGroup;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['Guilherme', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      newsletter: false,
    });
  }

  public submit() {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.modalRef.close();
  }

  public show(): void {
    this.modalRef = this.modalService.open({ templateRef: this.modalTemplateRef, title: 'User details' });
  }
}
