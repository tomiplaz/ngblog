import { Theme, Size } from "./settings.values";
import { SettingsActionName, SettingsAction } from "./settings.actions";

const SETTINGS_KEY = 'bloggging-settings';
const DEFAULT_THEME = Theme.Light;
const DEFAULT_SIZE = Size.Medium;

export interface SettingsState {
  theme: Theme,
  size: Size,
};

const localStorageSettings: SettingsState = JSON.parse(localStorage.getItem(SETTINGS_KEY));

const initialState: SettingsState = localStorageSettings ? {
  theme: localStorageSettings.theme || DEFAULT_THEME,
  size: localStorageSettings.size || DEFAULT_SIZE,
} : {
  theme: DEFAULT_THEME,
  size: DEFAULT_SIZE,
};

export function settingsReducer(state: SettingsState = initialState, action: SettingsAction) {
  switch (action.type) {
    case SettingsActionName.TOGGLE_THEME: {
      let newState: SettingsState = {
        ...state,
        theme: state.theme === Theme.Light ? Theme.Dark : Theme.Light,
      };

      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newState));

      return newState;
    }
    case SettingsActionName.TOGGLE_SIZE: {
      let newState: SettingsState = {
        ...state,
        size: state.size === Size.Small ? Size.Medium :
          state.size === Size.Medium ? Size.Large :
          Size.Small,
      };

      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newState));

      return newState;
    }
    default:
      return state;
  }
};
