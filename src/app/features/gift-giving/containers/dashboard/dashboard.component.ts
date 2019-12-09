import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectDashboardModel } from '../../reducers';
import { Observable } from 'rxjs';
import { DashboardModel } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  model$: Observable<DashboardModel[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectDashboardModel);
  }

}
