import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from './core/settings.service';
import { Theme, Size } from './core/settings.service';
import { LoginService } from './core/api/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class.light') isLight: boolean;
  @HostBinding('class.dark') isDark: boolean;
  @HostBinding('class.small') isSmall: boolean;
  @HostBinding('class.medium') isMedium: boolean;
  @HostBinding('class.large') isLarge: boolean;
  @HostBinding('class.header-closed') isHeaderClosed: boolean = false;
  @HostBinding('class.header-list-horizontal') isHeaderListHorizontal: boolean = false;
  private themeSubscription: Subscription;
  private sizeSubscription: Subscription;
  private loggedInUserSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
      });
    this.sizeSubscription = this.settingsService.size$
      .subscribe(size => {
        this.isSmall = size === Size.Small;
        this.isMedium = size === Size.Medium;
        this.isLarge = size === Size.Large;
      });
    this.loggedInUserSubscription = this.loginService.loggedInUser$
      .subscribe(user => {
        this.isHeaderListHorizontal = !user;
      });
  }

  onHeaderToggled(isClosed) {
    this.isHeaderClosed = isClosed;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
    this.loggedInUserSubscription.unsubscribe();
  }

}
