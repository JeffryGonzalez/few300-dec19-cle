import { Action, createReducer, on, State } from '@ngrx/store';
import * as holidayActions from '../actions/holidays.actions';
import * as recipientActions from '../actions/recipients.actions';

export interface LoadingState {
  recipientsLoaded: boolean;
  holidaysLoaded: boolean;
}

const initialState: LoadingState = {
  recipientsLoaded: false,
  holidaysLoaded: false
};
export function reducer(state: LoadingState = initialState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(holidayActions.loadHolidays, (state) => ({ ...state, holidaysLoaded: false })),
  on(holidayActions.loadHolidaysSucceeded, (state) => ({ ...state, holidaysLoaded: true })),
  on(recipientActions.loadRecipientData, (state) => ({ ...state, recipientsLoaded: false })),
  on(recipientActions.loadRecipientDataSuccess, (state) => ({ ...state, recipientsLoaded: true }))
);
