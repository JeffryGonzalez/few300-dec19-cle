import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as recipientActions from '../actions/recipients.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RecipientEntity } from '../reducers/recipients.reducer';
@Injectable()
export class RecipientEffects {
  readonly baseUrl = environment.rootApiUrl + 'recipients';


  constructor(private client: HttpClient, private actions$: Actions) { }


  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipientActions.loadRecipientData),
      switchMap(() => this.client.get<RecipientResponse>(this.baseUrl)
        .pipe(
          map(r => r.recipients),
          map(r => r.map(m => ({ id: m.id, name: m.name, selectedHolidayIds: m.holidays } as RecipientEntity))),
          map(r => recipientActions.loadRecipientDataSuccess({ payload: r }))
        )
      )
    ));


}

interface RecipientResponse {
  recipients: RecipientFromApi[];
}

interface RecipientFromApi {
  id: string;
  name: string;
  holidays: string[];
}
