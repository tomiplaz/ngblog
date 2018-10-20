import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Settings } from './settings.interface';

export enum Theme { Light, Dark };
export enum Size { Small, Medium, Large };

const SETTINGS_KEY = 'ngblog-settings';
const DEFAULT_THEME = Theme.Light;
const DEFAULT_SIZE = Size.Medium;

@Injectable()
export class SettingsService {

  private settings: Settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
  private theme: Subject<Theme> = new BehaviorSubject(DEFAULT_THEME);
  private size: Subject<Size> = new BehaviorSubject(DEFAULT_SIZE);
  theme$ = this.theme.asObservable();
  size$ = this.size.asObservable();

  constructor() {
    if (this.settings) {
      this.theme.next(this.settings.theme);
      this.size.next(this.settings.size);
    } else {
      this.settings = { theme: DEFAULT_THEME, size: DEFAULT_SIZE };
      this.updateSettings(this.settings);
    }
  }

  changeTheme(theme: Theme) {
    this.theme.next(theme);
    this.updateSettings({ ...this.settings, theme });
  }

  changeSize(size: Size) {
    this.size.next(size);
    this.updateSettings({ ...this.settings, size });
  }

  updateSettings(settings: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

}
