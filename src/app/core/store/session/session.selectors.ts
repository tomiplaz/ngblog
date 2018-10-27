import { createSelector } from "@ngrx/store";
import { selectSession } from "../selectors";
import { SessionState } from "./session.reducer";

export const selectIsHeaderOpen = createSelector(selectSession, (state: SessionState) => state.isHeaderOpen);
export const selectIsFooterOpen = createSelector(selectSession, (state: SessionState) => state.isFooterOpen);
