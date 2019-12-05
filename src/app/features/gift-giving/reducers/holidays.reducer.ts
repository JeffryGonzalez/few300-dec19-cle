import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/holidays.actions';
export interface HolidayEntity {
  id: string;
  name: string;
  date: string;
}

export interface HolidayState extends EntityState<HolidayEntity> {

}

export const adapter = createEntityAdapter<HolidayEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState,
  on(actions.addHoliday, (state, action) => {
    // action.payload.name = action.payload.name.toUpperCase();
    return adapter.addOne(action.payload, state);
  }),
  on(actions.loadHolidaysSucceeded, (state, action) => adapter.addAll(action.payload, state)),
  on(actions.addHolidaySucceeded, (state, action) => {
    const oldState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, oldState);
  }),
  on(actions.addHolidayFailed, (state, action) => adapter.removeOne(action.payload.id, state))
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}



