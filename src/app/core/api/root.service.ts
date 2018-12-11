import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HomeData } from '../../home/home-data.interface';

@Injectable()
export class RootService {

  readonly BASE_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getHomeData(): Observable<HomeData> {
    return this.httpClient.get<HomeData>(`${this.BASE_URL}/home`);
  }

}
