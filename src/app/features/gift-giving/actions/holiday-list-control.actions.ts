import { createAction } from '@ngrx/store';


export const showAll = createAction(
  '[gift giving] show all holidays'
);

export const showUpcoming = createAction(
  '[gift giving] show upcoming holidays'
);

export const sortByName = createAction(
  '[gift giving] sort holidays by name'
);

export const sortByDate = createAction(
  '[gift giving] sort holidays by date'
);
