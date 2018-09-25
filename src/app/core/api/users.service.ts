import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { User } from '../../users/user.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  private static baseUrl = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(UsersService.baseUrl);
  }
  
  getUser(stringId: string): Observable<User> {
    return this.httpClient.get<User>(UsersService.baseUrl + '/' + stringId);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(UsersService.baseUrl, user);
  }

}
