import { Action } from "@ngrx/store";
import { Theme, Size } from "./settings.values";

export enum SettingsActionName {
  CHANGE_THEME = '[Settings] Change Theme',
  CHANGE_SIZE = '[Settings] Change Size',
};

export class ChangeTheme implements Action {
  readonly type = SettingsActionName.CHANGE_THEME;

  constructor(public theme: Theme) { }
};

export class ChangeSize implements Action {
  readonly type = SettingsActionName.CHANGE_SIZE;

  constructor(public size: Size) { }
};

export type SettingsAction = ChangeTheme | ChangeSize;
