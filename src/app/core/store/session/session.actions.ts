import { Action } from "@ngrx/store";

export enum SessionActionName {
  TOGGLE_HEADER = '[Session] Toggle Header',
  TOGGLE_FOOTER = '[Session] Toggle Footer',
  FREEZE_OPEN_HEADER = '[Session] Freeze Open Header',
  THAW_CLOSE_HEADER = '[Session] Thaw Close Header',
};

export class ToggleHeader implements Action {
  readonly type = SessionActionName.TOGGLE_HEADER;
};

export class ToggleFooter implements Action {
  readonly type = SessionActionName.TOGGLE_FOOTER;
};

export class FreezeOpenHeader implements Action {
  readonly type = SessionActionName.FREEZE_OPEN_HEADER;
};

export class ThawCloseHeader implements Action {
  readonly type = SessionActionName.THAW_CLOSE_HEADER;
};

export type SessionAction = ToggleHeader | ToggleFooter | FreezeOpenHeader | ThawCloseHeader;
