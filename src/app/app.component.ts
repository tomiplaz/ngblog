import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from './core/settings.service';
import { Theme } from './core/settings.service';

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
  private themeSubscription: Subscription;
  private sizeSubscription: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
      });
    this.sizeSubscription = this.settingsService
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
  }

}
