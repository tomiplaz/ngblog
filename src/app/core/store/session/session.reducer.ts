import { SessionAction, SessionActionName } from "./session.actions";

export interface Session {
  isHeaderOpen: boolean,
  isFooterOpen: boolean,
};

const initialState: Session = {
  isHeaderOpen: true,
  isFooterOpen: true,
};

export const sessionReducer = (state: Session = initialState, action: SessionAction) => {
  switch (action.type) {
    case SessionActionName.OPEN_HEADER:
      return { ...state, isHeaderOpen: true };
    case SessionActionName.CLOSE_HEADER:
      return { ...state, isHeaderOpen: false };
    case SessionActionName.OPEN_FOOTER:
      return { ...state, isFooterOpen: true };
    case SessionActionName.CLOSE_FOOTER:
      return { ...state, isFooterOpen: false };
  }
};
