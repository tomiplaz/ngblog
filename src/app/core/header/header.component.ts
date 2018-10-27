import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../api/login.service';
import { User } from '../../users/user.interface';
import { AppState } from '../store/store';

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

  user: User;
  isLoginOrCreateAccountUrl: boolean;
  loggedInRoutingItems: RoutingItem[] = [
    { commands: ['profile'], text: 'Profile' },
    { commands: ['posts', 'new'], text: 'Post' },
  ];
  loggedOutRoutingItems: RoutingItem[] = [
    { commands: ['login'], text: 'Login' },
    { commands: ['create-account'], text: 'Join!' },
  ];

  private navigationEndEventsSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.navigationEndEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrCreateAccountUrl = ['/login', '/create-account'].includes(event.url);
      });
    this.store.subscribe(store => {
      this.user = store.auth.user;
      this.classAttribute = [
        store.settings.theme,
        store.settings.size,
        ...store.session.isHeaderOpen ? [] : ['closed'],
        ...store.auth.isLoggedIn ? [] : ['list-horizontal'],
      ].join(' ');
    });
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.navigationEndEventsSubscription.unsubscribe();
  }

}
