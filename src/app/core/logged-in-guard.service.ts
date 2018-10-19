import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './api/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private loginService: LoginService
  ) { }

  canActivate() {
    return Boolean(this.loginService.loggedInUser$);
  }

}
