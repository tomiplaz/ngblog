import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth/auth.reducer";
import { SettingsState } from "./settings/settings.reducer";
import { SessionState } from "./session/session.reducer";

export const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectSettings = createFeatureSelector<SettingsState>('settings');
export const selectSession = createFeatureSelector<SessionState>('session');
