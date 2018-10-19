import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { Subscription } from 'rxjs/Subscription';
import { filter, distinctUntilChanged } from 'rxjs/operators';

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
  private isLoginOrCreateAccountUrl: boolean;
  private loggedInUserSubscription: Subscription;
  private navigationEndEventsSubscription: Subscription;
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
    this.loggedInUserSubscription = this.loginService.loggedInUser$
      .subscribe(user => this.loggedInUser = user);
    this.navigationEndEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrCreateAccountUrl = ['/login', '/create-account'].includes(event.url);
      });
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.loggedInUserSubscription.unsubscribe();
    this.navigationEndEventsSubscription.unsubscribe();
  }

}

interface RoutingItem {
  commands: string[],
  text: string,
}
