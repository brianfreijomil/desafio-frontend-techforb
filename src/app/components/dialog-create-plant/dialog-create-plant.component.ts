import { CommonModule } from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Plant, PlantOut } from '../../interfaces/plant';
import { PlantService } from '../../services/plant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

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

  msgError:string = '';
  saveFailed:boolean = false;



  countries: string[] = [];

  constructor(
    private utilSrv: UtilsService,
    private plantSrv:PlantService,
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

    this.countries = this.utilSrv.getCountryNames();
  }

  savePlant() {
    this.msgError = '';
    this.saveFailed = false;

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
          this.saveFailed = true
          if (err.status >= 400) {
            this.msgError = err.error.message;
          } else {
            this.msgError = err.error?.message || '';
            // console.log(err);
          }
        }
      })
    } else {
      //UPDATE
      if (plantSaved.name == this.plant.name && plantSaved.country == this.plant.country) {
        this.currentDialog.close();
      } else {
        this.plantSrv.updatePlant(this.plant.id,plantSaved).subscribe({
          next: (result) => {
            if (result) {
              this.currentDialog.close(result)
            }
          },
          error: (err) => {
            // console.log(err);
            this.currentDialog.close(undefined);
          }
        })
      }
    }
  }

  onCancel(): void {
    this.currentDialog.close();
  }

}
