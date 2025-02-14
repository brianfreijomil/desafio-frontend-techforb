import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  type: 'warning' | 'success' | 'error' | 'info';
  msg: string;
}

@Component({
  selector: 'app-dialog-toast',
  imports: [
    MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogContent,
        MatDialogClose,
        CommonModule
  ],
  templateUrl: './dialog-toast.component.html',
  styleUrl: './dialog-toast.component.scss'
})
export class DialogToastComponent {

  readonly dialogRef = inject(MatDialogRef<DialogToastComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly type = model(this.data.type);
    readonly msg = model(this.data.msg);

  onCancel(): void {
    this.dialogRef.close();
  }

}
