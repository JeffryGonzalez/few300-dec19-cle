import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import * as actions from '../../../actions/holidays.actions';

@Component({
  selector: 'app-holiday-entry',
  templateUrl: './holiday-entry.component.html',
  styleUrls: ['./holiday-entry.component.scss']
})
export class HolidayEntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addHoliday(nameEl: HTMLInputElement, dateEl: HTMLInputElement) {
    const name = nameEl.value;
    const date = dateEl.valueAsDate.toISOString();
    // Dispatch
    this.store.dispatch(actions.addHoliday({ name, date }));
    nameEl.value = '';
    dateEl.valueAsDate = new Date(); // today.
    nameEl.focus();
  }
}
