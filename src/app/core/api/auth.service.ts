import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppState } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';

export interface Credentials {
  email: string,
  password: string
}

export interface ResetPassword {
  token: string,
  newPassword: string,
}

@Injectable()
export class AuthService {

  readonly BASE_URL = `${environment.apiUrl}/auth`;
  readonly CONFIRM_ACCOUNT_URL = `${this.BASE_URL}/confirm-account`;
  readonly LOGIN_URL = `${this.BASE_URL}/login`;
  readonly FORGOT_PASSWORD_URL = `${this.BASE_URL}/forgot-password`;
  readonly RESET_PASSWORD_URL = `${this.BASE_URL}/reset-password`;

  constructor(private httpClient: HttpClient, private store: Store<AppState>) { }

  confirmAccount(token: string): Observable<any> {
    return this.httpClient.post<any>(this.CONFIRM_ACCOUNT_URL, { token });
  }

  login(credentials: Credentials): Observable<any> {
    const observable = this.httpClient.post<any>(this.LOGIN_URL, credentials).pipe(share());

    observable.subscribe(response => {
      this.store.dispatch(new Login(response.token, response.user));
    }, () => {});

    return observable;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(this.FORGOT_PASSWORD_URL, { email });
  }

  resetPassword(data: ResetPassword): Observable<any> {
    return this.httpClient.post<any>(this.RESET_PASSWORD_URL, data);
  }

}
