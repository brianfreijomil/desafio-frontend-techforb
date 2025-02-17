import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsHistoryComponent } from './plants-history.component';

describe('PlantsHistoryComponent', () => {
  let component: PlantsHistoryComponent;
  let fixture: ComponentFixture<PlantsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
