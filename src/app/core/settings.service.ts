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

  private theme: Subject<Theme> = new BehaviorSubject(DEFAULT_THEME);
  private size: Subject<Size> = new BehaviorSubject(DEFAULT_SIZE);
  theme$ = this.theme.asObservable();
  size$ = this.size.asObservable();

  constructor() {
    const settings = this.getSettings();
    if (settings) {
      this.theme.next(settings.theme);
      this.size.next(settings.size);
    } else {
      this.setSettings({ theme: DEFAULT_THEME, size: DEFAULT_SIZE });
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
