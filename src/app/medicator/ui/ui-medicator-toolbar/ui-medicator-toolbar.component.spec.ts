import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMedicatorToolbarComponent } from './ui-medicator-toolbar.component';

describe('UiMedicatorToolbarComponent', () => {
  let component: UiMedicatorToolbarComponent;
  let fixture: ComponentFixture<UiMedicatorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMedicatorToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMedicatorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
