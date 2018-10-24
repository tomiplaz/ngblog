import { Action } from "@ngrx/store";

export enum SessionActionName {
  OPEN_HEADER = '[Session] Open Header',
  CLOSE_HEADER = '[Session] Close Header',
  OPEN_FOOTER = '[Session] Open Footer',
  CLOSE_FOOTER = '[Session] Close Footer',
};

export class OpenHeader implements Action {
  readonly type = SessionActionName.OPEN_HEADER;
}

export class CloseHeader implements Action {
  readonly type = SessionActionName.CLOSE_HEADER;
}

export class OpenFooter implements Action {
  readonly type = SessionActionName.OPEN_FOOTER;
}

export class CloseFooter implements Action {
  readonly type = SessionActionName.CLOSE_FOOTER;
}

export type SessionAction = OpenHeader | CloseHeader | OpenFooter | CloseFooter; 
