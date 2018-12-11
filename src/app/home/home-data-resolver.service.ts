import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HomeData } from './home-data.interface';
import { RootService } from '../core/api/root.service';

@Injectable()
export class HomeDataResolverService implements Resolve<HomeData> {

  constructor(private rootService: RootService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeData> {
    return this.rootService.getHomeData();
  }

}
