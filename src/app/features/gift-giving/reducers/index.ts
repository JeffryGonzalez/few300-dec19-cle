export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromRecipients from './recipients.reducer';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromRecipientModels from '../models/recipients';
import * as fromHolidayListControlModels from '../models/list-controls';
import * as fromLoading from './loading.reducer';
import * as moment from 'moment';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardModel } from '../models';


export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
  recipients: fromRecipients.RecipientState;
  loading: fromLoading.LoadingState;
}


export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer,
  recipients: fromRecipients.reducer,
  loading: fromLoading.reducer
};


// SELECTORS

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);
// 2. Feature per branch.
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);
const selectRecipientBranch = createSelector(selectGiftFeature, g => g.recipients);
const selectLoadingBranch = createSelector(selectGiftFeature, g => g.loading);
// 3. Helpers
const selectHolidaysLoaded = createSelector(selectLoadingBranch, b => b.holidaysLoaded);
const selectRecipientsLoaded = createSelector(selectLoadingBranch, b => b.recipientsLoaded);
const { selectAll: selectHolidayArray, selectEntities: selectHolidayEntities } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);

const {
  selectAll: selectRecipientArray,
  selectEntities: selectRecipientEntities
} = fromRecipients.adapter.getSelectors(selectRecipientBranch);

const selectShowAll = createSelector(
  selectHolidayListControlsBranch,
  b => b.showAll
);
const selectSortBy = createSelector(
  selectHolidayListControlsBranch,
  b => b.sortBy
);
// 4. For the Components

export const selectFeatureLoaded = createSelector(
  selectHolidaysLoaded,
  selectRecipientsLoaded,
  (h, r) => h && r
);
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

export const selectHolidayListModel = createSelector(
  selectHolidayModelRaw,
  r => r.holidays // TODO: Think about the filtering and sorting here later.
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


// Return the Recipient List Model

export const selectRecipientModel = createSelector(
  selectRecipientArray,
  selectHolidayEntities,
  (recipients, holidays) => {
    return recipients.map(recipient => {
      return {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        holidays: recipient.selectedHolidayIds // ["1", "2"]
          .map(id => holidays[id]).map(makeHolidayThing)
      } as fromRecipientModels.RecipientListModel;
    });
  }
);

function makeHolidayThing(h: fromHolidays.HolidayEntity) {
  return {
    id: h.id,
    description: h.name + ' (' + moment(h.date).format('MMMM Do, YYYY') + ')'
  };
}


export const selectDashboardModel = createSelector(
  selectHolidayModelRaw,
  selectRecipientModel,
  (holiday, recipients) => {
    const upcomingSortedHolidays = [...holiday.holidays.filter(h => new Date(h.date) >= new Date()).sort((lhs, rhs) => {
      if (new Date(lhs.date) > new Date(rhs.date)) {
        return 1;
      }
      if (new Date(lhs.date) < new Date(rhs.date)) {
        return 1;
      }
      return 0;

    })];
    console.log(upcomingSortedHolidays);
    return upcomingSortedHolidays.map(h => ({
      holidayId: h.id,
      holidayName: h.name + ' (' + moment(h.date).format('MMMM Do, YYYY') + ')',
      recipients: getRecipientsForHoliday(h.id, recipients)
    } as DashboardModel));

  }
);


// Given a holiday, and all the recipients, which recipients celebrate that holiday?
function getRecipientsForHoliday(holidayId: string, recipients: fromRecipientModels.RecipientListModel[]) {
  const recipientsCelebratingThatHoliday = recipients.filter(r => r.holidays.some(h => h.id === holidayId));
  return recipientsCelebratingThatHoliday.map(r => ({ id: r.id, name: r.name }));
}
/*
export interface DashboardModel {
  holidayId: string;
  holidayName: string;
  recipients: {
    id: string;
    name: string;
  }[];
}
*/
