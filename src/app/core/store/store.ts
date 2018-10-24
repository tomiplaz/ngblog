import { settingsReducer } from "./settings/settings.reducer";
import { sessionReducer } from "./session/session.reducer";

export const store = {
  settings: settingsReducer,
  session: sessionReducer,
};