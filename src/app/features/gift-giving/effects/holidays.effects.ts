import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as holidayActions from '../actions/holidays.actions';
import { switchMap, map } from 'rxjs/operators';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { environment } from '../../../../environments/environment';
@Injectable()
export class HolidaysEffects {

  // when we get holidayAdded -> (holidayAddedSuccess | holidayAddedFailure)
  saveTheHoliday$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.addHoliday),
        switchMap((originalAction) => this.client.post<HolidayEntity>(`${environment.rootApiUrl}holidays`, {
          name: originalAction.payload.name,
          date: originalAction.payload.date
        }).pipe(
          map(newHoliday => holidayActions.addHolidaySucceeded({ payload: newHoliday, oldId: originalAction.payload.id }))
        ))
      )
    , { dispatch: true });

  // when we get loadHolidays -> loadHolidaysSucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.loadHolidays),
        switchMap(() => this.client.get<GetHolidaysResponse>(`${environment.rootApiUrl}holidays`)
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
