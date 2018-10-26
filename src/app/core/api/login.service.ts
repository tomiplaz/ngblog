import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../../environments/environment';
import { Credentials } from '../../login/credentials.interface';
import { AppStore } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';

@Injectable()
export class LoginService {

  readonly URL = `${environment.apiUrl}/login`;

  constructor(private httpClient: HttpClient, private store: Store<AppStore>) { }

  login(credentials: Credentials): Observable<any> {
    const observable = this.httpClient.post<any>(this.URL, credentials).share();

    observable.subscribe(response => {
      this.store.dispatch(new Login(response.token, response.user));
    });

    return observable;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
