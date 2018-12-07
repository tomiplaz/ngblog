import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';

export interface Credentials {
  email: string,
  password: string
}

@Injectable()
export class AuthService {

  readonly BASE_URL = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient, private store: Store<AppState>) { }

  login(credentials: Credentials): Observable<any> {
    const observable = this.httpClient.post<any>(`${this.BASE_URL}/login`, credentials).share();

    observable.subscribe(response => {
      this.store.dispatch(new Login(response.token, response.user));
    }, () => {});

    return observable;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/forgot-password`, { email });
  }

}
