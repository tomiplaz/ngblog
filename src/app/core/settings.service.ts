import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Settings } from './settings.interface';

export enum Theme { Light, Dark };
export enum Size { Small, Medium, Large };

export const SETTINGS_KEY = 'ngblog-settings';

@Injectable()
export class SettingsService {

  readonly DEFAULT_THEME = Theme.Light;
  readonly DEFAULT_SIZE = Size.Medium;
  private theme: Subject<Theme> = new BehaviorSubject(this.DEFAULT_THEME);
  private size: Subject<Size> = new BehaviorSubject(this.DEFAULT_SIZE);
  theme$ = this.theme.asObservable();
  size$ = this.size.asObservable();

  constructor() {
    const settings = this.getSettings();
    if (settings) {
      this.theme.next(settings.theme);
      this.size.next(settings.size);
    } else {
      this.setSettings({ theme: this.DEFAULT_THEME, size: this.DEFAULT_SIZE });
    }
  }

  private getSettings(): Settings {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY));
  }

  private setSettings(settings: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  changeTheme(theme: Theme) {
    this.theme.next(theme);
    this.setSettings({ ...this.getSettings(), theme });
  }

  changeSize(size: Size) {
    this.size.next(size);
    this.setSettings({ ...this.getSettings(), size });
  }

}
