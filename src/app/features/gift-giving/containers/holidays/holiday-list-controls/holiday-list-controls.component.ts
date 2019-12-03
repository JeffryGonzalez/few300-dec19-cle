import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import * as actions from '../../../actions/holiday-list-control.actions';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';
import { ListControlsModel } from '../../../models';
@Component({
  selector: 'app-holiday-list-controls',
  templateUrl: './holiday-list-controls.component.html',
  styleUrls: ['./holiday-list-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayListControlsComponent implements OnInit {

  @Input() model: ListControlsModel;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  showUpcoming() {
    this.store.dispatch(actions.showUpcoming());
  }
  showAll() {
    this.store.dispatch(actions.showAll());
  }
  sortByName() {
    this.store.dispatch(actions.sortByName());
  }
  sortByDate() {
    this.store.dispatch(actions.sortByDate());
  }
}
