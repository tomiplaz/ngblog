import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from './store/store';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(state => state.auth.isLoggedIn));
  }

}
