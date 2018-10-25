import { settingsReducer, Settings } from "./settings/settings.reducer";
import { sessionReducer, Session } from "./session/session.reducer";

export interface AppStore {
  settings: Settings,
  session: Session,
};

export const store = {
  settings: settingsReducer,
  session: sessionReducer,
};