import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

export interface DialogData {
  plantName: string;
  country: string;
}

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dialog-create-plant',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption,
    CommonModule
  ],
  templateUrl: './dialog-create-plant.component.html',
  styleUrl: './dialog-create-plant.component.scss',
  host: {'[style.--mat-form-field-container-height]':'50'}
})
export class DialogCreatePlantComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCreatePlantComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly country = model(this.data.country);
  readonly plantName = model(this.data.plantName);



  foods: Food[] = [
    {value: 'Argentina-1', viewValue: 'Argentina'},
    {value: 'Brasil-1', viewValue: 'Brasil'},
    {value: 'Uruguay-2', viewValue: 'Uruguay'},
  ];

  validatePlant() {
    return false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
