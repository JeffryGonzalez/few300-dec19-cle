export interface HolidaysModel {
  holidays: HolidayListItem[];
}

export interface HolidayListItem {
  id: string;
  name: string;
  date: string;
}
