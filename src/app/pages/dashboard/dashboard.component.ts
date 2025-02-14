import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogToastComponent } from '../../components/dialog-toast/dialog-toast.component';

export interface DataMonitoring {
  country: string;
  plant_name: string;
  read_ok: number;
  medium_alerts: number;
  red_alerts: number;
}

const ELEMENT_DATA: DataMonitoring[] = [
  {plant_name: 'Quilmes', country: 'Argentina', read_ok: 800, medium_alerts: 160, red_alerts: 24},
  {plant_name: 'Zarate', country: 'Argentina', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Sao Pablo', country: 'Brasil', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Asuncion', country: 'Paraguay', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Montevideo', country: 'Uruguay', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Bariloche', country: 'Argentina', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Medellin', country: 'Colombia', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Quito', country: 'Ecuador', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Santiago', country: 'Chile', read_ok: 300, medium_alerts: 10, red_alerts: 2},
  {plant_name: 'Bolivar', country: 'Bolivia', read_ok: 300, medium_alerts: 10, red_alerts: 2},
];


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,MatTableModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  plantSelected: boolean = false;

  displayedColumns: string[] = ['country', 'plant_name', 'read_ok', 'medium_alerts', 'red_alerts','actions'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<DataMonitoring>();
  userFullName: string = 'Juan Rojas';

  constructor() {}

  readonly data = signal('');
  readonly name = model('sss');
  readonly type = signal('success');
  readonly msg = signal('test');
  readonly dialog = inject(MatDialog);

  openDialogCreatePlant(): void {
    const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
      data: {name: this.name(), data: this.data()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.data.set(result);
      }
      this.openDialogToast();
    });
  }

  openDialogToast(): void {
    const dialogRef = this.dialog.open(DialogToastComponent, {
      data: {name: this.type(), data: this.msg()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.msg.set(result);
      }
      
    });
  }

}
