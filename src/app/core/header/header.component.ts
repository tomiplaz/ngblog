import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { AppStore } from '../store/store';

interface RoutingItem {
  commands: string[],
  text: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './header.component.css',
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class') classAttribute: string;
  @HostBinding('class.list-horizontal') isListHorizontal: boolean;

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

  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppStore>,
  ) { }

  ngOnInit() {
    this.loggedInUserSubscription = this.loginService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      this.isListHorizontal = !user;
    });
    this.navigationEndEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrCreateAccountUrl = ['/login', '/create-account'].includes(event.url);
      });
    this.store.subscribe(store => {
      this.classAttribute = [
        store.settings.theme,
        store.settings.size,
        ...store.session.isHeaderOpen ? [] : ['closed'],
      ].join(' ');
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
