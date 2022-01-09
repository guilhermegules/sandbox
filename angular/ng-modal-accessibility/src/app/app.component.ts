import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalRef } from './shared/modal/models/modal-ref';
import { ModalService } from './shared/modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('modal')
  public modalTemplateRef!: TemplateRef<any>;

  public modalRef!: ModalRef;

  constructor(private modalService: ModalService) {}

  public show(): void {
    this.modalRef = this.modalService.open({ templateRef: this.modalTemplateRef, title: 'User details' });
  }
}
