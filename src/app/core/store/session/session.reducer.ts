import { SessionAction, SessionActionName } from "./session.actions";

export interface SessionState {
  isHeaderOpen: boolean,
  isFooterOpen: boolean,
  isHeaderToggleDisabled: boolean,
};

const initialState: SessionState = {
  isHeaderOpen: true,
  isFooterOpen: true,
  isHeaderToggleDisabled: false,
};

export const sessionReducer = (state: SessionState = initialState, action: SessionAction) => {
  switch (action.type) {
    case SessionActionName.TOGGLE_HEADER:
      return { ...state, isHeaderOpen: !state.isHeaderOpen };
    case SessionActionName.TOGGLE_FOOTER:
      return { ...state, isFooterOpen: !state.isFooterOpen };
    case SessionActionName.DISABLE_HEADER_TOGGLE:
      return { ...state, isHeaderToggleDisabled: true };
    case SessionActionName.ENABLE_HEADER_TOGGLE:
      return { ...state, isHeaderToggleDisabled: false };
    default:
      return state;
  }
};
