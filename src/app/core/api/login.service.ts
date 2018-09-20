import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';
import { Login } from '../../login/login.interface';

@Injectable()
export class LoginService {

  private isLoggedIn: Subject<boolean> = new BehaviorSubject(false);
  isLoggedInObservable = this.isLoggedIn.asObservable();

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) {
    this.isLoggedIn.next(Boolean(this.getUserId()));
  }

  login(credentials: Login): any {
    const observable = this.httpClient.post<any>(environment.apiUrl + '/login', credentials).share();

    observable.subscribe(response => {
      this.jwtService.setJWT(response.token);
      this.isLoggedIn.next(true);
    }, response => { });

    return observable;
  }

  logout() {
    this.jwtService.removeJWT();
    this.isLoggedIn.next(false);
  }

  getUserId(): number | null {
    const token = this.jwtService.getJWT();
    try {
      const decoded = this.jwtService.decodeJWT(token);
      return decoded.sub;
    } catch (e) {
      return null;
    }
  }

}
