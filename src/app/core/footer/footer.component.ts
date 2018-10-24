import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs/Subscription';
import { Theme, Size } from '../settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './footer.component.css',
  ]
})
export class FooterComponent implements OnInit, OnDestroy {

  @HostBinding('class.closed') isClosed: boolean = false;

  isLight: boolean;
  isDark: boolean;
  @HostBinding('class.small') isSmall: boolean;
  @HostBinding('class.medium') isMedium: boolean;
  @HostBinding('class.large') isLarge: boolean;

  private themeSubscription: Subscription;
  private sizeSubscription: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$.subscribe(theme => {
      this.isLight = theme === Theme.Light;
      this.isDark = theme === Theme.Dark;
    });
    this.sizeSubscription = this.settingsService.size$.subscribe(size => {
      this.isSmall = size === Size.Small;
      this.isMedium = size === Size.Medium;
      this.isLarge = size === Size.Large;
    });
  }

  changeTheme() {
    this.settingsService.changeTheme(this.isLight ? Theme.Dark : Theme.Light);
  }

  changeSize() {
    const size = this.isSmall ? Size.Medium : this.isMedium ? Size.Large : Size.Small;
    this.settingsService.changeSize(size);
  }

  onToggled(isClosed: boolean) {
    this.isClosed = isClosed;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
  }

}
