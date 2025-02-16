import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { SensorService } from '../../services/sensor.service';
import { Sensor, SensorUpdate } from '../../interfaces/sensor';
import { Reading } from '../../interfaces/reading';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-dialog-update-sensor',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-update-sensor.component.html',
  styleUrl: './dialog-update-sensor.component.scss',
  host: {'[style.--mat-form-field-container-height]':'50'}
})
export class DialogUpdateSensorComponent implements OnInit {

  formSensor:FormGroup;

  constructor(
    private utilSrv:UtilsService,
    private sensorSrv:SensorService,
    private currentDialog: MatDialogRef<DialogUpdateSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public sensor:Sensor,
    private fb:FormBuilder,
  ){
    this.formSensor = this.fb.group({
      sensor_ok: ["",[Validators.required,Validators.max(1000),Validators.pattern("^[0-9]+$")]],
      medium_alerts: ["",[Validators.required,Validators.max(1000),Validators.pattern("^[0-9]+$")]],
      red_alerts: ["",[Validators.required,Validators.max(1000),Validators.pattern("^[0-9]+$")]],
    })
  }
  ngOnInit(): void {
    if(this.sensor) {
      this.formSensor.patchValue({
        sensor_ok: this.sensor.sensorOk.value,
        medium_alerts: this.sensor.mediumAlert.value,
        red_alerts: this.sensor.redAlert.value
      })
    }
  }

  updateSensor() {

    const r1:Reading = {id: this.sensor.sensorOk.id, value: this.formSensor.value.sensor_ok, type: this.sensor.sensorOk.type};
    const r2:Reading = {id: this.sensor.mediumAlert.id, value: this.formSensor.value.medium_alerts, type: this.sensor.mediumAlert.type};
    const r3:Reading = {id: this.sensor.redAlert.id, value: this.formSensor.value.red_alerts, type: this.sensor.redAlert.type};

    const sensorToSave:SensorUpdate = {
      readings: [r1,r2,r3]
    }

    this.sensorSrv.updateSensor(this.sensor.id,sensorToSave).subscribe({
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

  onCancel(): void {
    this.currentDialog.close();
  }

  getSensorName(type:string) {
    return this.utilSrv.getTypeName(type);
  }

}
