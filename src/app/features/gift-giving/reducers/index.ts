export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromHolidayModels from '../models/holidays';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
}


export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer
};


// SELECTORS

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);
// 2. Feature per branch.
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
// 3. Helpers
const { selectAll: selectHolidayArray } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);
// 4. For the Components

// 4.a. We need one that returns a holiday model.

export const selectHolidayModel = createSelector(
  selectHolidayArray,
  (holidays) => {
    return {
      holidays // Note: Easy for now because they are the same.
    } as fromHolidayModels.HolidaysModel;
  }
);
