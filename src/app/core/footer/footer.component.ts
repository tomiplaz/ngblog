import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs/Subscription';
import { Theme } from '../settings.service';

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
  themeCharacter: ThemeCharacter;
  private themeSubscription: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.themeSubscription = this.settingsService.theme$
      .subscribe(theme => {
        this.isLight = theme === Theme.Light;
        this.isDark = theme === Theme.Dark;
        this.themeCharacter = theme === Theme.Light ? ThemeCharacter.FSTAR : ThemeCharacter.STAR;
      });
  }

  toggleTheme() {
    this.settingsService.changeTheme(this.isLight ? Theme.Dark : Theme.Light);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
