import { Action } from "@ngrx/store";

export enum SessionActionName {
  TOGGLE_HEADER = '[Session] Toggle Header',
  TOGGLE_FOOTER = '[Session] Toggle Footer',
  DISABLE_HEADER_TOGGLE = '[Session] Disable Header Toggle',
  ENABLE_HEADER_TOGGLE = '[Session] Enable Header Toggle',
};

export class ToggleHeader implements Action {
  readonly type = SessionActionName.TOGGLE_HEADER;
};

export class ToggleFooter implements Action {
  readonly type = SessionActionName.TOGGLE_FOOTER;
};

export class DisableHeaderToggle implements Action {
  readonly type = SessionActionName.DISABLE_HEADER_TOGGLE;
};

export class EnableHeaderToggle implements Action {
  readonly type = SessionActionName.ENABLE_HEADER_TOGGLE;
};

export type SessionAction = ToggleHeader | ToggleFooter | DisableHeaderToggle | EnableHeaderToggle;
