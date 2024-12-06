import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dropdown } from '@core/models/dropdown.model';
import { uniqueTimeValuesValidator } from '@core/validators/duplicate-time.validator';
import { IMedication, MedicationUnit, unitsDropdown, Weekdays, weekdaysSelect } from '@medicator/models/medication.model';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-ui-medicator-dialog',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    KeyFilterModule,
    SelectButtonModule,
    CalendarModule,
  ],
  templateUrl: './ui-medicator-dialog.component.html',
  styleUrl: './ui-medicator-dialog.component.css',
})
export class UiMedicatorDialogComponent {
  private readonly dialogRef = inject(DynamicDialogRef);

  get unitsDropdown(): Dropdown<MedicationUnit> {
    return unitsDropdown;
  }

  get weekDaysSelect(): Dropdown<Weekdays> {
    return weekdaysSelect;
  }

  get timeControl(): FormArray {
    return this.addMedicationForm.get('time') as FormArray;
  }

  addMedicationForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(256)],
    }),
    dosage: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
    unit: new FormControl<MedicationUnit>('Capsules', { nonNullable: true, validators: [Validators.required] }),
    days: new FormControl<Weekdays[]>(['Mon'], { nonNullable: true, validators: [Validators.required] }),
    time: new FormArray([this.generateTimeControl()], { validators: [Validators.required, uniqueTimeValuesValidator()] }),
  });

  addTime(): void {
    this.timeControl.markAsTouched();
    this.timeControl.valid && this.timeControl?.push(this.generateTimeControl());
  }

  removeTime(timeIndex: number): void {
    this.timeControl.removeAt(timeIndex);
  }

  onAddMedication(): void {
    const controls = this.addMedicationForm.controls;
    for (const control in controls) {
      if (Object.prototype.hasOwnProperty.call(controls, control)) {
        const formControl = controls[control as keyof typeof controls];
        formControl.markAsDirty();
        formControl.markAsTouched();
      }
    }
    if (this.addMedicationForm.invalid) return;
    const result = this.mapMedicationFormValues(this.addMedicationForm.getRawValue());
    this.dialogRef.close(result);
  }

  dismissDialog(): void {
    this.dialogRef.close();
  }

  private generateTimeControl(): FormControl<Date> {
    return new FormControl<Date>(new Date(), { nonNullable: true, validators: [Validators.required] });
  }

  private mapMedicationFormValues(formValue: {
    name: string;
    dosage: number | null;
    unit: MedicationUnit;
    days: Weekdays[];
    time: Date[];
  }): IMedication {
    const { time, days, dosage, ...rest } = formValue;
    const normalizedTimes = time?.map((val) => `${val.getHours()}:${val.getMinutes()}:00`) as IMedication['time'];
    const frequency = `${days.length === 7 ? 'Every day' : days.join(', ')} at ${normalizedTimes.join(', ')}`;
    return { ...rest, frequency, days, dosage: dosage ?? 0, time: normalizedTimes, lastUpdated: new Date().toISOString() };
  }
}
