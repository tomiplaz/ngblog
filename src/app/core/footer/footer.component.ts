import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs/Subscription';
import { Theme, Size } from '../settings.service';

enum ThemeCharacter {
  STAR = '&#x02606;',
  FSTAR = '&#x02605;',
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './footer.component.css',
  ]
})
export class FooterComponent implements OnInit, OnDestroy {

  isLight: boolean;
  isDark: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  themeCharacter: ThemeCharacter;
  private themeSubscription: Subscription;
  private sizeSubscription: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
        this.themeCharacter = theme === Theme.Light ? ThemeCharacter.FSTAR : ThemeCharacter.STAR;
      });
    this.sizeSubscription = this.settingsService.size$
      .subscribe(size => {
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

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
  }

}
