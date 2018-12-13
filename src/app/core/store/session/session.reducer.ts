import { SessionAction, SessionActionName } from './session.actions';

export interface SessionState {
  isHeaderOpen: boolean;
  isFooterOpen: boolean;
  isHeaderToggleDisabled: boolean;
}

const initialState: SessionState = {
  isHeaderOpen: true,
  isFooterOpen: false,
  isHeaderToggleDisabled: true,
};

export function sessionReducer(state: SessionState = initialState, action: SessionAction) {
  switch (action.type) {
    case SessionActionName.TOGGLE_HEADER:
      return { ...state, isHeaderOpen: !state.isHeaderOpen };
    case SessionActionName.TOGGLE_FOOTER:
      return { ...state, isFooterOpen: !state.isFooterOpen };
    case SessionActionName.FREEZE_OPEN_HEADER:
      return { ...state, isHeaderOpen: true, isHeaderToggleDisabled: true};
    case SessionActionName.THAW_CLOSE_HEADER:
      return { ...state, isHeaderOpen: false, isHeaderToggleDisabled: false };
    default:
      return state;
  }
}
