import { createSelector } from '@ngrx/store';
import { selectSettings } from '../selectors';
import { SettingsState } from './settings.reducer';

export const selectTheme = createSelector(selectSettings, (state: SettingsState) => state.theme);
export const selectSize = createSelector(selectSettings, (state: SettingsState) => state.size);
