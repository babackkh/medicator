import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMedicatorDialogComponent } from './ui-medicator-dialog.component';

describe('UiMedicatorDialogComponent', () => {
  let component: UiMedicatorDialogComponent;
  let fixture: ComponentFixture<UiMedicatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMedicatorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMedicatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
