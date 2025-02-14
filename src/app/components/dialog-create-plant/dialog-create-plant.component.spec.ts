import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePlantComponent } from './dialog-create-plant.component';

describe('DialogCreatePlantComponent', () => {
  let component: DialogCreatePlantComponent;
  let fixture: ComponentFixture<DialogCreatePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreatePlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
