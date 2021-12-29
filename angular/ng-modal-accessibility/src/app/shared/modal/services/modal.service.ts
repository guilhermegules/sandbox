import { Injectable } from '@angular/core';
import { ModalConfig } from '../interfaces/modal-config';
import { ModalRef } from '../models/modal-ref';

@Injectable()
export class ModalService {
  public open(config: ModalConfig) {
    console.log('open');

    return new ModalRef();
  }
}
