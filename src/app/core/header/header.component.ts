import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { IconDefinition, faUser, faPen, faSignInAlt, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/Subscription';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../api/auth.service';
import { User } from '../../users/user.interface';
import { AppState } from '../store/store';
import { ToggleHeader } from '../store/session/session.actions';

interface RoutingItem {
  commands: string[],
  icon: IconDefinition,
  text: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class') classAttribute: string;

  faSignOutAlt: IconDefinition = faSignOutAlt;

  isLoggedIn: boolean;
  isToggleDisabled: boolean;
  isAuthUrl: boolean;
  loggedInRoutingItems: RoutingItem[] = [
    { commands: ['/my-profile'], icon: faUser, text: 'My Profile' },
    { commands: ['/create-post'], icon: faPen, text: 'Create Post' },
  ];
  loggedOutRoutingItems: RoutingItem[] = [
    { commands: ['/login'], icon: faSignInAlt, text: 'Login' },
    { commands: ['/create-account'], icon: faUserPlus, text: 'Create Account' },
  ];

  private navigationEndEventsSubscription: Subscription;
  private storeSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.navigationEndEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe((event: NavigationEnd) => {
        this.isAuthUrl = event.url.includes('login') ||
          event.url.includes('create-account') ||
          event.url.includes('confirm-account') ||
          event.url.includes('reset-password');
      });
    this.store.subscribe(state => {
      this.isLoggedIn = state.auth.isLoggedIn;
      this.isToggleDisabled = state.session.isHeaderToggleDisabled;
      this.classAttribute = [
        state.settings.theme,
        state.settings.size,
        ...state.session.isHeaderOpen ? [] : ['closed'],
        ...state.auth.isLoggedIn ? [] : ['list-horizontal'],
      ].join(' ');
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  onToggleClick() {
    if (!this.isToggleDisabled) this.store.dispatch(new ToggleHeader());
  }

  ngOnDestroy() {
    this.navigationEndEventsSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
