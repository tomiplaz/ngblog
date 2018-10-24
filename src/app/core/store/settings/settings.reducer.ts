import { Theme, Size } from "./settings.values";
import { SettingsActionName, SettingsAction } from "./settings.actions";

export interface Settings {
  theme: Theme,
  size: Size,
};

const initialState: Settings = {
  theme: Theme.Light,
  size: Size.Medium,
};

export const settingsReducer = (state: Settings = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionName.CHANGE_THEME:
      return { ...state, theme: action.theme };
    case SettingsActionName.CHANGE_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};
