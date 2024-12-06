import { inject, Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LazyDialogueService {
  private readonly primengDialogService = inject(DialogService);

  openLazyDialog<T, D>(component: Type<unknown>, header: string, config: DynamicDialogConfig<T>): Observable<D> {
    const dialogRef = this.primengDialogService.open(component, {
      header,
      closable: true,
      closeOnEscape: true,
      draggable: true,
      maximizable: false,
      showHeader: true,
      autoZIndex: true,
      resizable: false,
      ...config,
    });
    return dialogRef.onClose as Observable<D>;
  }
}
