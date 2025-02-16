import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDisableEnableItemComponent } from './dialog-disable-enable-item.component';

describe('DialogDisableEnableItemComponent', () => {
  let component: DialogDisableEnableItemComponent;
  let fixture: ComponentFixture<DialogDisableEnableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDisableEnableItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDisableEnableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
