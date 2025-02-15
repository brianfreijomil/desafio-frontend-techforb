import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteItemComponent } from './dialog-delete-item.component';

describe('DialogDeleteItemComponent', () => {
  let component: DialogDeleteItemComponent;
  let fixture: ComponentFixture<DialogDeleteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
