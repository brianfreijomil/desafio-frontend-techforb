import { Component } from '@angular/core';
import { WorkingPageComponent } from '../../components/working-page/working-page.component';

@Component({
  selector: 'app-plant-monitoring',
  imports: [WorkingPageComponent],
  templateUrl: './plant-monitoring.component.html',
  styleUrl: './plant-monitoring.component.scss',
  standalone: true
})
export class PlantMonitoringComponent {

  constructor() {
  }
}
