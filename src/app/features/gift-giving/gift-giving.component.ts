import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftGivingState, selectFeatureLoaded } from './reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-gift-giving',
  templateUrl: './gift-giving.component.html',
  styleUrls: ['./gift-giving.component.scss']
})
export class GiftGivingComponent implements OnInit {

  loaded$: Observable<boolean>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.loaded$ = this.store.select(selectFeatureLoaded);
  }

}
