import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, signal} from '@angular/core';
import {FormGroup, FormsModule, Validators, FormBuilder} from '@angular/forms';
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
import { Plant, PlantOut } from '../../interfaces/plant';
import { PlantService } from '../../services/plant.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dialog-create-plant',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatSelect,
    MatOption,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-create-plant.component.html',
  styleUrl: './dialog-create-plant.component.scss',
  host: {'[style.--mat-form-field-container-height]':'50'}
})
export class DialogCreatePlantComponent implements OnInit {

  formPlant:FormGroup;
  action:string = '';

  titleAction:string = 'Crear nueva planta'
  btnAction:string = 'Crear';

  countries: any[] = [
    {value: 'Argentina', viewValue: 'Argentina'},
    {value: 'Brasil', viewValue: 'Brasil'},
    {value: 'Uruguay', viewValue: 'Uruguay'},
    {value: 'Alemania', viewValue: 'Alemania'},
    {value: 'Rusia', viewValue: 'Rusia'},
    {value: 'Ghana', viewValue: 'Ghana'},
    {value: 'Arabia Saudita', viewValue: 'Arabia Saudita'},
  ];

  constructor(private plantSrv:PlantService,
    private currentDialog: MatDialogRef<DialogCreatePlantComponent>,
    @Inject(MAT_DIALOG_DATA) public plant:Plant,
    private fb:FormBuilder,
  ){
    this.formPlant = this.fb.group({
      name: ["",Validators.required],
      country: ["",Validators.required],
    })

    //verifico si es edicion o creacion de planta
    if(this.plant) {
      this.titleAction = "Editar planta";
      this.btnAction = "Editar";
    }
  }
  ngOnInit(): void {
    //en caso de edicion de planta inicializo los valores del form con los de la planta a editar
    if(this.plant) {
      this.formPlant.patchValue({
        name: this.plant.name,
        country: this.plant.country
      })
    }
  }

  savePlant() {
    //item to save
    const plantSaved:PlantOut = {
      name: this.formPlant.value.name,
      country: this.formPlant.value.country
    }

    //CREATE PLANT
    if (!this.plant) {
      this.plantSrv.savePlant(plantSaved).subscribe({
        next: (result) => {
          if (result) {
            this.currentDialog.close(result)
          }
        },
        error: (err) => {
          console.log("err",err);
          this.currentDialog.close(undefined);
        }
      })
    } else {
      //UPDATE
      this.plantSrv.updatePlant(this.plant.id,plantSaved).subscribe({
        next: (result) => {
          if (result) {
            this.currentDialog.close(result)
          }
        },
        error: (err) => {
          console.log("err",err);
          this.currentDialog.close(undefined);
        }
      })
    }
  }

  onCancel(): void {
    this.currentDialog.close();
  }

}
