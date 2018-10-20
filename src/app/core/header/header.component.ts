import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { SettingsService } from '../settings.service';
import { Theme } from '../settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './header.component.css',
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class.light') isLight: boolean;
  @HostBinding('class.dark') isDark: boolean;
  loggedInUser: User;
  isLoginOrCreateAccountUrl: boolean;
  loggedInRoutingItems: RoutingItem[] = [
    { commands: ['profile'], text: 'Profile' },
    { commands: ['posts', 'new'], text: 'Post' },
  ];
  loggedOutRoutingItems: RoutingItem[] = [
    { commands: ['login'], text: 'Login' },
    { commands: ['create-account'], text: 'Join!' },
  ];
  private loggedInUserSubscription: Subscription;
  private navigationEndEventsSubscription: Subscription;
  private themeSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.loggedInUserSubscription = this.loginService.loggedInUser$
      .subscribe(user => this.loggedInUser = user);
    this.navigationEndEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrCreateAccountUrl = ['/login', '/create-account'].includes(event.url);
      });
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
      });
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.loggedInUserSubscription.unsubscribe();
    this.navigationEndEventsSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

}

interface RoutingItem {
  commands: string[],
  text: string,
}
