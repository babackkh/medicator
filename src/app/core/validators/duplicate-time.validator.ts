import { ValidatorFn, AbstractControl } from '@angular/forms';

export function uniqueTimeValuesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const values = (control.value as Date[]).filter((value) => value !== null).map((val) => `${val.getHours()}:${val.getMinutes()}:00`);
    const uniqueValues = new Set(values);

    return values.length !== uniqueValues.size ? { duplicateTimeValues: true } : null;
  };
}
