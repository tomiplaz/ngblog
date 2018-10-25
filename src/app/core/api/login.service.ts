import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../../environments/environment';
import { Credentials } from '../../login/credentials.interface';
import { User } from '../../users/user.interface';
import { AppStore } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';

export const JWT_KEY = 'ngblog-jwt';
export const USER_KEY = 'ngblog-user';

@Injectable()
export class LoginService {

  readonly URL = `${environment.apiUrl}/login`;

  constructor(private httpClient: HttpClient, private store: Store<AppStore>) { }

  login(credentials: Credentials): Observable<any> {
    const observable = this.httpClient.post<any>(this.URL, credentials).share();

    observable.subscribe(response => {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      localStorage.setItem(JWT_KEY, response.token);

      this.store.dispatch(new Login(response.token, response.user));
    });

    return observable;
  }

  logout() {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(USER_KEY);

    this.store.dispatch(new Logout());
  }

  getToken(): string | null {
    return localStorage.getItem(JWT_KEY);
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  getUserId(): number | null {
    const user: User = this.getUser();
    return user ? user.id : null;
  }

}
