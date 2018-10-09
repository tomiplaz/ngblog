import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private loggedInUser: User = null;
  private loggedInUserSubscription: Subscription;
  private loggedInRoutingItems: RoutingItem[] = [];
  private loggedOutRoutingItems: RoutingItem[] = [];
  private constantRoutingItems: RoutingItem[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loggedInUserSubscription = this.loginService.loggedInUserObservable
      .subscribe(user => {
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

  ngOnDestroy() {
    this.loggedInUserSubscription.unsubscribe();
  }

}

interface RoutingItem {
  commands: string[],
  text: string,
}
