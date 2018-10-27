import { createSelector } from '@ngrx/store';
import { selectAuth } from '../selectors';
import { AuthState } from './auth.reducer';

export const selectToken = createSelector(selectAuth, (state: AuthState) => state.token);
export const selectUser = createSelector(selectAuth, (state: AuthState) => state.user);
export const selectIsLoggedIn = createSelector(selectAuth, (state: AuthState) => state.isLoggedIn);
