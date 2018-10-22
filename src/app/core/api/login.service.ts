import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

import { environment } from '../../../environments/environment';
import { Login } from '../../login/login.interface';
import { User } from '../../users/user.interface';
import { Observable } from 'rxjs/Observable';

export const JWT_KEY = 'ngblog-jwt';
export const USER_KEY = 'ngblog-user';

@Injectable()
export class LoginService {

  readonly URL = `${environment.apiUrl}/login`;
  private loggedInUser: Subject<User> = new BehaviorSubject(this.getUser());
  loggedInUser$ = this.loggedInUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(credentials: Login): Observable<any> {
    const observable = this.httpClient.post<any>(this.URL, credentials).share();

    observable.subscribe(response => {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      localStorage.setItem(JWT_KEY, response.token);
      this.loggedInUser.next(response.user);
    });

    return observable;
  }

  logout() {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(USER_KEY);
    this.loggedInUser.next(null);
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
