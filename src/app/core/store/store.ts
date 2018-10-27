import { authReducer, AuthState } from "./auth/auth.reducer";
import { settingsReducer, SettingsState } from "./settings/settings.reducer";
import { sessionReducer, SessionState } from "./session/session.reducer";
import { createFeatureSelector } from "@ngrx/store";

export interface AppState {
  auth: AuthState,
  settings: SettingsState,
  session: SessionState,
};

export const store = {
  auth: authReducer,
  settings: settingsReducer,
  session: sessionReducer,
};

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectSettings = createFeatureSelector<SettingsState>('settings');

export const selectSession = createFeatureSelector<SessionState>('session');
