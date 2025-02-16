import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SensorService } from '../../services/sensor.service';
import { Sensor } from '../../interfaces/sensor';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-dialog-disable-enable-item',
  imports: [MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    CommonModule,],
  templateUrl: './dialog-disable-enable-item.component.html',
  styleUrl: './dialog-disable-enable-item.component.scss'
})
export class DialogDisableEnableItemComponent implements OnInit {

  titleDialog:string = '';
    descriptionDialog:string = '';
    btnAction:string = '';
  
    constructor(private sensorSrv: SensorService, private utilSrv:UtilsService,
      private currentDialog: MatDialogRef<DialogDisableEnableItemComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Sensor,
    ) { }
  
    ngOnInit(): void {
      this.titleDialog = this.data.isEnabled ? "Deshabilitar sensor":"Habilitar sensor";
      this.descriptionDialog = `Vas a ${this.data.isEnabled ? 'Deshabilitar':'Habilitar'} el sensor '${this.utilSrv.getTypeName(this.data.type)}'.`;
      this.btnAction = this.data.isEnabled ? "Deshabilitar":"Habilitar"
    }
  
    disableEnableSensor(): void {
      if (this.data) {
        this.sensorSrv.disableEnableSensor(this.data.id).subscribe({
          next: (response) => {
            this.currentDialog.close(response);
          },
          error: (err) => {
            console.error('Disable enable sensor Error', err);
          },
        });
      }
    }
  
    onCancel(): void {
      this.currentDialog.close();
    }

}
