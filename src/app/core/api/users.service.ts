import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User, UpdateUser, ChangePassword } from '../../users/user.interface';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';

@Injectable()
export class UsersService {

  readonly BASE_URL = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<PaginatedResponse<User>> {
    return this.httpClient.get<PaginatedResponse<User>>(this.BASE_URL);
  }
  
  getUser(stringId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}/${stringId}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL, user);
  }

  updateUser(userId: number, data: UpdateUser): Observable<User> {
    return this.httpClient.patch<User>(`${this.BASE_URL}/${userId}`, data);
  }

  changePassword(userId: number, data: ChangePassword): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${userId}/change-password`, data);
  }

}
