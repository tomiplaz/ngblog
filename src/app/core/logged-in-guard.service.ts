import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './api/login.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private loginService: LoginService) { }

  canActivate(): Observable<boolean> {
    return this.loginService.loggedInUser$.pipe(map(loggedInUser => Boolean(loggedInUser)));
  }

}
