import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn;

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

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onCreateAccountClick() {
    this.router.navigate(['/create-account']);
  }

  onLogoutClick() {
    this.loginService.logout();
  }

  onNewPostClick() {
    this.router.navigate(['/posts/new']);
  }

}
