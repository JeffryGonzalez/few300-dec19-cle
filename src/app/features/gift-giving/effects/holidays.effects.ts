import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as holidayActions from '../actions/holidays.actions';
import { switchMap, map } from 'rxjs/operators';
import { HolidayEntity } from '../reducers/holidays.reducer';
@Injectable()
export class HolidaysEffects {

  // when we get loadHolidays -> loadHolidaysSucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.loadHolidays),
        switchMap(() => this.client.get<GetHolidaysResponse>('http://localhost:3000/holidays')
          .pipe(
            map(response => response.holidays),
            map((holidays) => holidayActions.loadHolidaysSucceeded({ payload: holidays }))
          )
        )
      )
    , { dispatch: true });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetHolidaysResponse {
  holidays: HolidayEntity[];
}
