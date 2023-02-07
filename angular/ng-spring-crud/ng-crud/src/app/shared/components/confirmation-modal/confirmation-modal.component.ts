import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationModalStatus } from './confirmation-modal.enum';
import { ConfirmationModalData } from './confirmation-modal.model';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(ConfirmationModalStatus.CANCEL);
  }
}
