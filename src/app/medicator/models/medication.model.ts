import { Dropdown } from '@core/models/dropdown.model';

export type Weekdays = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type MedicationUnit = 'Capsules' | 'Tablets' | 'Applications' | 'Drops' | 'Milligrams' | 'Micrograms';

export interface IMedication {
  name: string;
  dosage: number;
  unit: MedicationUnit;
  days: Weekdays[];
  time: `${number}:${number}`[];
  lastUpdated: string;
  frequency?: string;
}

export const unitsDropdown: Dropdown<MedicationUnit> = [
  { label: 'Capsules', value: 'Capsules' },
  { label: 'Applications', value: 'Applications' },
  { label: 'Drops', value: 'Drops' },
  { label: 'Micrograms', value: 'Micrograms' },
  { label: 'Milligrams', value: 'Milligrams' },
  { label: 'Tablets', value: 'Tablets' },
];

export const weekdaysSelect: Dropdown<Weekdays> = [
  { label: 'Mon', value: 'Mon' },
  { label: 'Tue', value: 'Tue' },
  { label: 'Wed', value: 'Wed' },
  { label: 'Thu', value: 'Thu' },
  { label: 'Fri', value: 'Fri' },
  { label: 'Sat', value: 'Sat' },
  { label: 'Sun', value: 'Sun' },
];
