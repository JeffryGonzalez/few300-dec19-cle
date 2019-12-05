import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/app.actions';

export interface ErrorState {
  hasError: boolean;
  errorMessage: string;
}


const initialState: ErrorState = {
  hasError: false,
  errorMessage: null
};

export function reducer(state: ErrorState = initialState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(actions.applicationError, (state, action) => ({
    hasError: true,
    errorMessage: action.message
  })),
  on(actions.clearApplicationError, () => initialState)
);
