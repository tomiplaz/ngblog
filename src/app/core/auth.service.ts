import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  forgotPassword(name: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/forgot-password`, { name });
  }

}
