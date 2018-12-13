import { Action } from '@ngrx/store';

export enum SettingsActionName {
  TOGGLE_THEME = '[Settings] Toggle Theme',
  TOGGLE_SIZE = '[Settings] Toggle Size',
}

export class ToggleTheme implements Action {
  readonly type = SettingsActionName.TOGGLE_THEME;
}

export class ToggleSize implements Action {
  readonly type = SettingsActionName.TOGGLE_SIZE;
}

export type SettingsAction = ToggleTheme | ToggleSize;
