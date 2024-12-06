import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DataAccessMedicatorService } from '@medicator/data-access/data-access-medicator.service';
import { UiMedicatorTableComponent } from '@medicator/ui/ui-medicator-table/ui-medicator-table.component';
import { UiMedicatorToolbarComponent } from '@medicator/ui/ui-medicator-toolbar/ui-medicator-toolbar.component';
import { exhaustMap, from, Subject, Subscription, switchMap, tap } from 'rxjs';
import { LazyDialogueService } from '@core/services/lazy-dialog.service';
import { IMedication } from '@medicator/models/medication.model';

@Component({
  selector: 'app-feat-medicator',
  imports: [UiMedicatorTableComponent, UiMedicatorToolbarComponent, AsyncPipe],
  templateUrl: './feat-medicator.component.html',
  styleUrl: './feat-medicator.component.css',
})
export class FeatMedicatorComponent implements OnInit, OnDestroy {
  private readonly medicatorService = inject(DataAccessMedicatorService);
  private readonly lazyDialogueService = inject(LazyDialogueService);

  private readonly subscription = new Subscription();

  private readonly dialogTrigger$$ = new Subject<void>();
  readonly addMedication$ = this.dialogTrigger$$.asObservable().pipe(
    exhaustMap(() =>
      from(
        import('../../ui/ui-medicator-dialog/ui-medicator-dialog.component').then((c) => {
          return c.UiMedicatorDialogComponent;
        }),
      ).pipe(
        switchMap((component) =>
          this.lazyDialogueService
            .openLazyDialog<IMedication | undefined, IMedication | undefined>(component, 'Add Medication', {
              data: undefined,
            })
            .pipe(
              tap((result) => {
                if (result) {
                  this.medicatorService.addMedication(result);
                }
              }),
            ),
        ),
      ),
    ),
  );

  medicationsList$ = this.medicatorService.medications$;

  tableSearchValue = signal<string>('');

  ngOnInit(): void {
    this.medicatorService.getMedicationsList();
    this.subscription.add(this.addMedication$.subscribe());
  }

  onAddMedicationClick(): void {
    this.dialogTrigger$$.next();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
