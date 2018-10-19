import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Theme } from './settings.values';

@Injectable()
export class SettingsService {

  private theme: Subject<Theme> = new BehaviorSubject(null);
  theme$ = this.theme.asObservable();

  constructor() {
    this.theme.next(Theme.Light);
  }

  changeTheme(newTheme: Theme) {
    this.theme.next(newTheme);
  }

}
