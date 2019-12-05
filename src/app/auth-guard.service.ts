import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUserIsAdmin } from './reducers';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>) { }
  canActivate() {
    return this.store.select(selectUserIsAdmin);
  }


}
