import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToastComponent } from './dialog-toast.component';

describe('DialogToastComponent', () => {
  let component: DialogToastComponent;
  let fixture: ComponentFixture<DialogToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
