import * as fromErrors from './errors.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  errors: fromErrors.ErrorState;
}

export const reducers = {
  errors: fromErrors.reducer
};

// Selectors

// 1. Feature selector (we AREN'T IN A FEATURE !!!)

// 2. Selector per branch.

const selectErrorBranch = (state: AppState) => state.errors;

// 3. Helpers (optional)

// 4. For the components.

// Hint: You'll need a couple. One to tell if there is an error, the other
// for the message.

export const selectHasError = createSelector(
  selectErrorBranch,
  b => b.hasError
);

export const selectErrorMessage = createSelector(
  selectErrorBranch,
  b => b.errorMessage
);
