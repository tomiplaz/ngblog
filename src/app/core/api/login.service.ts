import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

import { environment } from '../../../environments/environment';
import { Login } from '../../login/login.interface';
import { User } from '../../users/user.interface';

const JWT_KEY = 'ngblog-jwt';
const USER_KEY = 'ngblog-user';

@Injectable()
export class LoginService {

  private loggedInUser: Subject<User> = new BehaviorSubject(null);
  loggedInUserObservable = this.loggedInUser.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loggedInUser.next(this.getUser());
  }

  login(credentials: Login): any {
    const observable = this.httpClient.post<any>(environment.apiUrl + '/login', credentials).share();

    observable.subscribe(response => {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      localStorage.setItem(JWT_KEY, response.token);
      this.loggedInUser.next(response.user);
    }, response => { });

    return observable;
  }

  logout() {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(USER_KEY);
    this.loggedInUser.next(null);
  }

  getToken(): string {
    return localStorage.getItem(JWT_KEY);
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

}
