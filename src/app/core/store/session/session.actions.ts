import { Action } from "@ngrx/store";

export enum SessionActionName {
  TOGGLE_HEADER = '[Session] Toggle Header',
  TOGGLE_FOOTER = '[Session] Toggle Footer',
};

export class ToggleHeader implements Action {
  readonly type = SessionActionName.TOGGLE_HEADER;
}

export class ToggleFooter implements Action {
  readonly type = SessionActionName.TOGGLE_FOOTER;
}

export type SessionAction = ToggleHeader | ToggleFooter;
