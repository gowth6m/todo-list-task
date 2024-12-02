import React from 'react';
import { merge } from 'lodash';
import { useMemo } from 'react';

import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';

import { useAppSelector } from 'src/store/hooks';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const themeMode = useAppSelector((state) => state.settings.theme);

  const memoizedValue = useMemo(
    () =>
      ({
        palette: {
          ...palette(themeMode),
        },
        customShadows: {
          ...customShadows(themeMode),
        },
        shape: { borderRadius: 16 },
        shadows: shadows(themeMode),
        typography: typography,
      }) as ThemeOptions,
    [themeMode]
  );

  const themeObj = createTheme(memoizedValue as ThemeOptions);
  themeObj.components = merge(componentsOverrides(themeObj));

  return (
    <MuiThemeProvider theme={themeObj}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
