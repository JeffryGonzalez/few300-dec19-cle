import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectHasError, selectErrorMessage } from './reducers';
import { applicationStarted } from './actions/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'few300';

  hasError$: Observable<boolean>;
  errorMessage$: Observable<string>;
  store: Store<AppState>;
  constructor(store: Store<AppState>) {
    store.dispatch(applicationStarted());
    this.store = store;
  }

  ngOnInit() {
    this.hasError$ = this.store.select(selectHasError);
    this.errorMessage$ = this.store.select(selectErrorMessage);;
  }
}
