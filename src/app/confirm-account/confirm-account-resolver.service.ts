import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/api/auth.service';

@Injectable()
export class ConfirmAccountResolverService implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.authService.confirmAccount(route.queryParamMap.get('token'));
  }

}
