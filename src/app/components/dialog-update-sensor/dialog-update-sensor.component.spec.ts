import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateSensorComponent } from './dialog-update-sensor.component';

describe('DialogUpdateSensorComponent', () => {
  let component: DialogUpdateSensorComponent;
  let fixture: ComponentFixture<DialogUpdateSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
