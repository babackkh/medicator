import { Component, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-ui-medicator-toolbar',
  imports: [InputIconModule, IconFieldModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './ui-medicator-toolbar.component.html',
  styleUrl: './ui-medicator-toolbar.component.css',
})
export class UiMedicatorToolbarComponent {
  searchFieldControl = new FormControl('', { nonNullable: true });

  addMedicationClick = output<void>();

  searchFieldValueChange = outputFromObservable(
    this.searchFieldControl.valueChanges.pipe(
      map((value) => value.trim()),
      map((value) => (value.length < 2 ? '' : value)),
      distinctUntilChanged(),
      debounceTime(250),
    ),
  );
}
