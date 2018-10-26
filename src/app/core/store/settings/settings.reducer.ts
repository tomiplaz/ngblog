import { Theme, Size } from "./settings.values";
import { SettingsActionName, SettingsAction } from "./settings.actions";

const SETTINGS_KEY = 'bloggging-settings';

export interface SettingsState {
  theme: Theme,
  size: Size,
};

const localStorageSettings: SettingsState = JSON.parse(localStorage.getItem(SETTINGS_KEY));

const initialState: SettingsState = {
  theme: 'theme' in localStorageSettings ? localStorageSettings.theme : Theme.Light,
  size: 'size' in localStorageSettings ? localStorageSettings.size : Size.Medium,
};

export const settingsReducer = (state: SettingsState = initialState, action: SettingsAction) => {
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
