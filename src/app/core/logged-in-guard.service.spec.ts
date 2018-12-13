import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { LoggedInGuard } from './logged-in-guard.service';
import { authReducer } from './store/auth/auth.reducer';
import { AppState } from './store/store';
import { Login } from './store/auth/auth.actions';
import { User } from '../users/user.interface';

describe('LoggedInGuard', () => {
  let service: LoggedInGuard;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: authReducer,
        }),
      ],
      providers: [LoggedInGuard],
    });

    service = TestBed.get(LoggedInGuard);
    store = TestBed.get(Store);
  });

  it('#canActivate should return false if user is not logged in', () => {
    service.canActivate().subscribe(canActivate => {
      expect(canActivate).toBeFalsy();
    });
  });

  it('#canActivate should return true if user is logged in', () => {
    const token = 'foobar';
    const user: User = { name: 'Foo', email: 'foo@bar.com' };

    store.dispatch(new Login(token, user));

    service.canActivate().subscribe(canActivate => {
      expect(canActivate).toBeTruthy();
    });
  });
});
