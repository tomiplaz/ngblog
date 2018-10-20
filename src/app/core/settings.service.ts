import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Settings } from './settings.interface';

const SETTINGS_KEY = 'ngblog-settings';
export enum Theme { Light, Dark };

@Injectable()
export class SettingsService {

  private settings: Settings;
  private theme: Subject<Theme> = new BehaviorSubject(Theme.Light);
  theme$ = this.theme.asObservable();

  constructor() {
    this.settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (this.settings) {
      this.theme.next(this.settings.theme);
    } else {
      this.updateSettings({
        theme: Theme.Light,
      });
    }
  }

  changeTheme(theme: Theme) {
    this.theme.next(theme);
    this.updateSettings({ ...this.settings, theme });
  }

  updateSettings(settings: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

}
