import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMonitoringComponent } from './plant-monitoring.component';

describe('PlantMonitoringComponent', () => {
  let component: PlantMonitoringComponent;
  let fixture: ComponentFixture<PlantMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
