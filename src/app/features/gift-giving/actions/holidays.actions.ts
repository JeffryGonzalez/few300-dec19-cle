import { createAction, props } from '@ngrx/store';
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

export const addHolidaySucceeded = createAction(
  '[gift giving] holiday added successfully',
  props<{ payload: HolidayEntity, oldId: string }>()
);

export const addHolidayFailed = createAction(
  '[gift giving] adding a holiday failed',
  props<{ payload: HolidayEntity, message: string }>()
);
export const loadHolidays = createAction(
  '[gift giving] load the holidays'
);

export const loadHolidaysSucceeded = createAction(
  '[gift giving] loading the holidays worked',
  props<{ payload: HolidayEntity[] }>()
);

export const loadHolidaysFailed = createAction(
  '[gift giving] loading the holidays failed',
  props<{ payload: string }>()
);
