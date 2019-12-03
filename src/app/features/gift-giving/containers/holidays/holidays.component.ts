import { Component, OnInit } from '@angular/core';
import { GiftGivingState, selectHolidayModel } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HolidaysModel } from '../../models';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  holidayModel$: Observable<HolidaysModel>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidayModel$ = this.store.select(selectHolidayModel);
  }

}
