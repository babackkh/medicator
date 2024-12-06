import { Routes } from '@angular/router';
import { DataAccessMedicatorService } from '@medicator/data-access/data-access-medicator.service';

export const routes: Routes = [
  {
    path: 'medicator',
    providers: [DataAccessMedicatorService],
    loadComponent: async () => {
      const m = await import('@medicator/feat/feat-medicator/feat-medicator.component');
      return m.FeatMedicatorComponent;
    },
  },
  { path: '', pathMatch: 'full', redirectTo: 'medicator' },
];
