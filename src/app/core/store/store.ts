import { authReducer, AuthState } from "./auth/auth.reducer";
import { settingsReducer, SettingsState } from "./settings/settings.reducer";
import { sessionReducer, SessionState } from "./session/session.reducer";

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
