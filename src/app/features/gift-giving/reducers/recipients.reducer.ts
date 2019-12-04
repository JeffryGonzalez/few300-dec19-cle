import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/recipients.actions';
export interface RecipientEntity {
  id: string;
  name: string;
  email: string;
  selectedHolidayIds: string[];
}

export interface RecipientState extends EntityState<RecipientEntity> {

}

export const adapter = createEntityAdapter<RecipientEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.recipientAdded, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: RecipientState = initialState, action: Action) {
  return reducerFunction(state, action);
}



