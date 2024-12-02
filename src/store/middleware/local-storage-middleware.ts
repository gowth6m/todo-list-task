import { Middleware } from '@reduxjs/toolkit';

import { AppConfig } from 'src/configs/app-config';

import { RootState } from '..';
import { setTheme, toggleTheme } from '../slices/settings-slice';

// ----------------------------------------------------------------------

type SettingsAction = ReturnType<typeof setTheme | typeof toggleTheme>;

function isSettingsAction(action: unknown): action is SettingsAction {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (action.type === setTheme.type || action.type === toggleTheme.type)
  );
}

const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const defaultTheme = 'dark';
  if (!localStorage.getItem(AppConfig.localStorageKeys.store)) {
    localStorage.setItem(AppConfig.localStorageKeys.store, defaultTheme);
  }

  const result = next(action);

  if (isSettingsAction(action)) {
    const state = store.getState();
    localStorage.setItem(AppConfig.localStorageKeys.store, state.settings.theme);
  }

  return result;
};

export default localStorageMiddleware;
