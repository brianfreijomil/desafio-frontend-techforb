import { Component, Inject, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Plant } from '../../interfaces/plant';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

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

  constructor(private plantSrv: PlantService,
    private currentDialog: MatDialogRef<DialogDeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.titleDialog = this.data.title;
    this.descriptionDialog = this.data.description;
  }

  deletePlant(): void {
    if (this.data) {
      console.log("id",this.data.plantId)
      this.plantSrv.deletePlant(this.data.plantId).subscribe({
        next: (response) => {
          this.currentDialog.close(true);
        },
        error: (err) => {
          console.error('Delete Plant Error', err);
        },
      });
    }
  }

  onCancel(): void {
    this.currentDialog.close();
  }

}
