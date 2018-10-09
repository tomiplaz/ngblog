import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private loggedInUser: User = null;
  private loggedInRoutingItems: RoutingItem[] = [];
  private loggedOutRoutingItems: RoutingItem[] = [];
  private constantRoutingItems: RoutingItem[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.loggedInUserObservable.subscribe(user => {
      this.loggedInUser = user;
      if (user) {
        this.loggedInRoutingItems = [
          { commands: ['users', user.string_id], text: 'MY PROFILE' },
          { commands: ['posts', 'new'], text: 'NEW POST' },
        ];
      }
    });

    this.loggedOutRoutingItems = [
      { commands: ['login'], text: 'LOGIN' },
      { commands: ['create-account'], text: 'NEW ACCOUNT' },
    ];

    this.constantRoutingItems = [
      { commands: ['home'], text: 'HOME' },
      { commands: ['posts'], text: 'POSTS' },
      { commands: ['users'], text: 'USERS' },
    ];
  }

  onRoutableClick(commands) {
    this.router.navigate(commands);
  }

  onLogoutClick() {
    this.loginService.logout();
  }

}

interface RoutingItem {
  commands: string[],
  text: string,
}
