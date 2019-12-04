export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromHolidayListControlModels from '../models/list-controls';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { HolidaysComponent } from '../containers/holidays/holidays.component';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
}


export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer
};


// SELECTORS

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);
// 2. Feature per branch.
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);
// 3. Helpers
const { selectAll: selectHolidayArray } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);

const selectShowAll = createSelector(
  selectHolidayListControlsBranch,
  b => b.showAll
);
const selectSortBy = createSelector(
  selectHolidayListControlsBranch,
  b => b.sortBy
);
// 4. For the Components

// 4.a. We need one that returns a holiday model.

const selectHolidayModelRaw = createSelector(
  selectHolidayArray,
  (holidays) => {
    return {
      holidays // Note: Easy for now because they are the same.
    } as fromHolidayModels.HolidaysModel;
  }
);

const selectHolidayModelFiltered = createSelector(
  selectHolidayModelRaw,
  selectShowAll,
  (holidayModel, showAll) => {
    if (showAll) {
      return holidayModel;
    } else {
      return {
        holidays: holidayModel.holidays.filter(h => new Date(h.date) >= new Date())
      } as fromHolidayModels.HolidaysModel;
    }
  }
);

const selectHolidayListSorted = createSelector(
  selectHolidayModelFiltered,
  selectSortBy,
  (holiday, by) => {
    if (by === 'date') {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (new Date(lhs.date) < new Date(rhs.date)) {
              return -1;
            }
            if (new Date(lhs.date) > new Date(rhs.date)) {
              return 1;
            }
            return 0;
          }
        )]
      };
    } else {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (lhs.name.toLocaleLowerCase() < rhs.name.toLocaleLowerCase()) {
              return -1;
            }
            if (lhs.name.toLocaleLowerCase() > rhs.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          }
        )]
      };
    }
  }
);



export const selectHolidayModel = createSelector(
  selectHolidayListSorted,
  h => h
);


export const selectHolidayListControlsModel = createSelector(
  selectHolidayListControlsBranch,
  b => {
    return {
      showingAll: b.showAll,
      showingUpComing: !b.showAll,
      sortingByDate: b.sortBy === 'date',
      sortingByName: b.sortBy === 'name'
    } as fromHolidayListControlModels.ListControlsModel;
  }
);
