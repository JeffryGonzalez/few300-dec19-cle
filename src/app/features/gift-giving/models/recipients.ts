export interface RecipientListModel {
  id: string;
  name: string;
  email: string;
  holidays: RecipientListHolidayItemModel[];
}

export interface RecipientListHolidayItemModel {
  id: string;
  description: string;
}
