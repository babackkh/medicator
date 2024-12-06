import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMedicatorTableComponent } from './ui-medicator-table.component';

describe('UiMedicatorTableComponent', () => {
  let component: UiMedicatorTableComponent;
  let fixture: ComponentFixture<UiMedicatorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMedicatorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMedicatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
