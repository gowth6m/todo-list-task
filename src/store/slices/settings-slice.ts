import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface SettingsState {
  theme: ThemeMode;
  drawer: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  drawer: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawer = !state.drawer;
    },
  },
});

export const { toggleTheme, setTheme, toggleDrawer } = settingsSlice.actions;

export default settingsSlice.reducer;
