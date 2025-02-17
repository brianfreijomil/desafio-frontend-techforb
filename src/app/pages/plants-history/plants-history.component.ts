import { Component } from '@angular/core';
import { WorkingPageComponent } from '../../components/working-page/working-page.component';

@Component({
  selector: 'app-plants-history',
  imports: [WorkingPageComponent],
  templateUrl: './plants-history.component.html',
  styleUrl: './plants-history.component.scss',
  standalone: true
})
export class PlantsHistoryComponent {

  constructor() { }

}
