import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IMedication } from '@medicator/models/medication.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ui-medicator-table',
  imports: [TableModule, DatePipe],
  templateUrl: './ui-medicator-table.component.html',
  styleUrl: './ui-medicator-table.component.css',
})
export class UiMedicatorTableComponent {
  medications = input.required<IMedication[] | null>();
  searchValue = input.required<string>();

  medicationsList = computed(() =>
    (this.medications() ?? []).filter((med) => med.name.toLowerCase().includes(this.searchValue().toLowerCase())),
  );
}
