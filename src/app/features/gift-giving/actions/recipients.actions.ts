import { createAction, props } from '@ngrx/store';
import { RecipientEntity } from '../reducers/recipients.reducer';

let currentId = 1;
export const recipientAdded = createAction(
  '[gift giving] added a recipient',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    }
  })
);

export const recipientAddedSuccessfully = createAction(
  '[gift giving] recipient added successfully',
  props<{ oldId: string, payload: RecipientEntity }>()
);

export const loadRecipientData = createAction(
  '[gift giving] load recipient data'
);

export const loadRecipientDataSuccess = createAction(
  '[gift giving] loading recipient data succeeded',
  props<{ payload: RecipientEntity[] }>()
);


