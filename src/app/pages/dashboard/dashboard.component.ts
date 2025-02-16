import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogToastComponent } from '../../components/dialog-toast/dialog-toast.component';
import { UtilsService } from '../../services/utils.service';
import { PlantService } from '../../services/plant.service';
import { Reading } from '../../interfaces/reading';
import { Plant } from '../../interfaces/plant';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogDeleteItemComponent } from '../../components/dialog-delete-item/dialog-delete-item.component';
import { Sensor, SensorIconEnum, SensorTypeEnum, SensorUpdate } from '../../interfaces/sensor';
import { DialogUpdateSensorComponent } from '../../components/dialog-update-sensor/dialog-update-sensor.component';
import { DialogDisableEnableItemComponent } from '../../components/dialog-disable-enable-item/dialog-disable-enable-item.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatTableModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['country', 'name', 'read_ok', 'medium_alerts', 'red_alerts', 'actions'];
  userUsername: string = '';

  sensorsDisabled: number = 0;
  summaryReadings: Reading[] = [];
  summaryReadingOk: Reading | undefined = undefined; 
  summaryReadingMediumAlert: Reading | undefined = undefined; 
  summaryReadingRedAlert: Reading | undefined = undefined; 

  plants: Plant[] = [];
  plantSelected: Plant | undefined = undefined;

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private plantSrv: PlantService,
    private utilSrv: UtilsService
  ) { }

  ngOnInit(): void {
    this.userUsername = this.utilSrv.getUserUsername() || 'Tu';
    this.getPlantsByUser();
    this.getSummaryReadings();
  }

  getSummaryReadings(): void {
    this.plantSrv.getSummaryReadings().subscribe({
      next: (response) => {
        console.log(response);
        this.summaryReadings = response.readings;
        this.summaryReadingOk = this.summaryReadings.find((r) => r.type === 'OK');
        this.summaryReadingMediumAlert = this.summaryReadings.find((r) => r.type === 'MEDIUM');
        this.summaryReadingRedAlert = this.summaryReadings.find((r) => r.type === 'RED');
        this.sensorsDisabled = response.sensorsDisabled;
      },
      error: (err) => {
        if (err.status === 404) {
          //no tiene resumen
          console.log("sin resumen")
        } else {
          console.error('Get SummaryReadings Error', err);
        }
      },
    });
  }

  getPlantsByUser(): void {
    this.plantSrv.getPlantsByUser().subscribe({
      next: (response) => {
        console.log(response)
        this.plants = response;
      },
      error: (err) => {
        console.error('Get Plants Error', err);
      },
    });
  }

  getPlantById(plant: Plant): void {
    if (plant) {
      this.plantSrv.getPlantDetail(plant.id).subscribe({
        next: (response) => {
          this.plantSelected = response.data;
        },
        error: (err) => {
          console.error('Get Plant Detail Error', err);
        },
      });
    }
  }

  openDialogCreateUpdatePlant(plantToEdit?: Plant): void {
    const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
      data: plantToEdit,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { //planta creada con exito
        //this.getSummaryReadings();
        this.plants = this.plants.filter((p) => p.id !== result.id);
        this.plants = [...this.plants, result]
        let msg = plantToEdit ? "Planta editada con éxito" : "Planta creada con éxito";
        this.openDialogToast("SUCCESS", msg);
      }
    });
  }

  openDialogUpdateSensor(sensorToEdit: Sensor): void {
    const dialogRef = this.dialog.open(DialogUpdateSensorComponent, {
      data: sensorToEdit,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.plantSrv.getPlantsByUser().subscribe({
          next: (response) => {
            this.plants = response;
            this.plantSelected = this.plants.find((p) => p.id === this.plantSelected?.id);
          },
          error: (err) => {
            console.error('Get Plants Error', err);
          },
        });
        this.getSummaryReadings();
        this.openDialogToast("SUCCESS", "Sensor editado con éxito");
      }
    });
  }

  openDialogDeletePlant(plantToDelete: Plant): void {
    if (plantToDelete) {
      const dialogRef = this.dialog.open(DialogDeleteItemComponent, {
        data: {
          plantId: plantToDelete.id,
          title: "Eliminar planta",
          description: `Vas a eliminar la planta '${plantToDelete.name} (${plantToDelete.country})'.`
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.plants = this.plants.filter((p) => p.id !== plantToDelete.id)
          this.openDialogToast("SUCCESS", "Planta eliminada con éxito");
        }
      });
    }

  }

  openDialogDisableEnableSensor(sensorToEdit: Sensor): void {
    if (sensorToEdit) {
      const dialogRef = this.dialog.open(DialogDisableEnableItemComponent, {
        data: sensorToEdit
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.plantSrv.getPlantsByUser().subscribe({
            next: (response) => {
              this.plants = response;
              this.plantSelected = this.plants.find((p) => p.id === this.plantSelected?.id);
            },
            error: (err) => {
              console.error('Get Plants Error', err);
            },
          });
          this.getSummaryReadings();
          this.openDialogToast("SUCCESS", `Planta ${result.isEnabled ? 'habilitada':'deshabilitada'} con éxito`);
        }
      });
    }

  }

  openDialogToast(type: string, msg: string): void {
    this.dialog.open(DialogToastComponent, { data: { type: type, msg: msg } });
  }


  getSensorName(type: string) {
    return this.utilSrv.getTypeName(type);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/sign_in']);
  }

  getUrlIcon(type: string) {
    if (type) {
      switch (type) {
        case 'TEMPERATURE':
          return SensorIconEnum.TEMPERATURE;
        case 'PRESSURE':
          return SensorIconEnum.PRESSURE;
        case 'WIND':
          return SensorIconEnum.WIND;
        case 'LEVELS':
          return SensorIconEnum.LEVELS;
        case 'ENERGY':
          return SensorIconEnum.ENERGY;
        case 'TENSION':
          return SensorIconEnum.TENSION;
        case 'CO2':
          return SensorIconEnum.CO2;
        case 'OTHER_GASES':
          return SensorIconEnum.CO2;
        default:
          return 'Unknown';
      }

    }
    return 'Unknown';
  }
}
