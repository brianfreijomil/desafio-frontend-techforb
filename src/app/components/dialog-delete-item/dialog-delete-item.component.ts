import { Component, Inject, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-delete-item',
  imports: [
    MatFormFieldModule,
        MatDialogContent,
        MatDialogActions,
        CommonModule,
  ],
  templateUrl: './dialog-delete-item.component.html',
  styleUrl: './dialog-delete-item.component.scss'
})
export class DialogDeleteItemComponent implements OnInit {

  titleDialog:string = '';
  descriptionDialog:string = '';

  loader:boolean = false;

  constructor(private plantSrv: PlantService,
    private currentDialog: MatDialogRef<DialogDeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.titleDialog = this.data.title;
    this.descriptionDialog = this.data.description;
  }

  deletePlant(): void {
    this.loader = true;

    if (this.data) {
      this.plantSrv.deletePlant(this.data.plantId).subscribe({
        next: (response) => {
          this.loader = false;
          this.currentDialog.close(true);
        },
        error: (err) => {
          this.loader = false;
          console.error('Delete Plant Error', err);
        },
      });
    }
  }

  onCancel(): void {
    this.currentDialog.close();
  }

}
