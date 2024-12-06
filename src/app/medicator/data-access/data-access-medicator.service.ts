import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { IMedication } from '@medicator/models/medication.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataAccessMedicatorService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly medicationsStorageKey = 'MED_LIST';

  private readonly medications$$ = new BehaviorSubject<IMedication[]>([]);
  readonly medications$ = this.medications$$.asObservable();

  getMedicationsList(): void {
    const medications = this.localStorageService.getItem<IMedication[]>(this.medicationsStorageKey);
    this.medications$$.next(medications ?? []);
  }

  addMedication(medication: IMedication): void {
    const updatedMedicationsList = [medication, ...this.medications$$.value];
    this.localStorageService.setItem(this.medicationsStorageKey, updatedMedicationsList);
    this.medications$$.next(updatedMedicationsList);
  }
}
