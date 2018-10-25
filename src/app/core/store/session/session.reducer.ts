import { SessionAction, SessionActionName } from "./session.actions";

export interface SessionState {
  isHeaderOpen: boolean,
  isFooterOpen: boolean,
};

const initialState: SessionState = {
  isHeaderOpen: true,
  isFooterOpen: true,
};

export const sessionReducer = (state: SessionState = initialState, action: SessionAction) => {
  switch (action.type) {
    case SessionActionName.TOGGLE_HEADER:
      return { ...state, isHeaderOpen: !state.isHeaderOpen };
    case SessionActionName.TOGGLE_FOOTER:
      return { ...state, isFooterOpen: !state.isFooterOpen };
    default:
      return state;
  }
};
