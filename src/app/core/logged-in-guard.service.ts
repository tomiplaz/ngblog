import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/store';
import { selectIsLoggedIn } from './store/auth/auth.selectors';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectIsLoggedIn));
  }

}
