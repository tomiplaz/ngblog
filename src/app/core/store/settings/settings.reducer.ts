import { Theme, Size } from "./settings.values";
import { SettingsActionName, SettingsAction } from "./settings.actions";

export interface SettingsState {
  theme: Theme,
  size: Size,
};

const initialState: SettingsState = {
  theme: Theme.Light,
  size: Size.Medium,
};

export const settingsReducer = (state: SettingsState = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionName.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === Theme.Light ? Theme.Dark : Theme.Light,
      };
    case SettingsActionName.TOGGLE_SIZE:
      return {
        ...state,
        size: state.size === Size.Small ? Size.Medium :
          state.size === Size.Medium ? Size.Large :
          Size.Small,
      };
    default:
      return state;
  }
};
