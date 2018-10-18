import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './navigation.component.css',
  ]
})
export class NavigationComponent implements OnInit, OnDestroy {

  private loggedInUser: User = null;
  private loggedInUserSubscription: Subscription;
  private loggedInRoutingItems: RoutingItem[] = [
    { commands: ['profile'], text: 'Profile' },
    { commands: ['posts', 'new'], text: 'Post' },
  ];
  private loggedOutRoutingItems: RoutingItem[] = [
    { commands: ['login'], text: 'Login' },
    { commands: ['create-account'], text: 'Join!' },
  ];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loggedInUserSubscription = this.loginService.loggedInUserObservable
      .subscribe(user => this.loggedInUser = user);
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
