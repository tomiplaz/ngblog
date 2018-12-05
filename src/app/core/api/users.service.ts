import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../../users/user.interface';

@Injectable()
export class UsersService {

  readonly BASE_URL = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL);
  }
  
  getUser(stringId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}/${stringId}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.BASE_URL}/${user.id}`, user);
  }

}
