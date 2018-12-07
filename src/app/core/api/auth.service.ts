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

  constructor(private httpClient: HttpClient, private store: Store<AppState>) { }

  login(credentials: Credentials): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    const observable = this.httpClient.post<any>(url, credentials).share();

    observable.subscribe(response => {
      this.store.dispatch(new Login(response.token, response.user));
    }, () => {});

    return observable;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  forgotPassword(name: string): Observable<any> {
    const url = `${environment.apiUrl}/forgot-password`;

    return this.httpClient.post<any>(url, { name });
  }

}
