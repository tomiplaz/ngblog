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
    case SessionActionName.TOGGLE_HEADER:
      return { ...state, isHeaderOpen: !state.isHeaderOpen };
    case SessionActionName.TOGGLE_FOOTER:
      return { ...state, isFooterOpen: !state.isFooterOpen };
    default:
      return state;
  }
};
