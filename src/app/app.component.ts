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
  private themeSubscription: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
