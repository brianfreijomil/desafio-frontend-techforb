import { CommonModule } from '@angular/common';
import { Component, Inject, inject, model, OnInit } from '@angular/core';
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
        CommonModule
  ],
  templateUrl: './dialog-toast.component.html',
  styleUrl: './dialog-toast.component.scss'
})
export class DialogToastComponent implements OnInit {

  type: string = '';
  msg: string = '';

    constructor(
        private currentDialog: MatDialogRef<DialogToastComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any,
    ){}

  ngOnInit(): void {
    this.type = this.data.type;
    this.msg = this.data.msg;
  }

  onCancel(): void {
    this.currentDialog.close();
  }

}
