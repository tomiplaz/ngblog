import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.isLoggedInObservable
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  onRoutableClick(commands) {
    this.router.navigate(commands);
  }

  onLogoutClick() {
    this.loginService.logout();
  }

}
