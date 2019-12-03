import { createAction } from '@ngrx/store';
import { HolidayEntity } from '../reducers/holidays.reducer';

let fakeId = 1;

export const addHoliday = createAction(
  '[gift giving] holiday added',
  ({ name, date }: { name: string, date: string }) => ({
    payload: {
      id: 'T' + fakeId++,
      name,
      date
    } as HolidayEntity
  })
);
