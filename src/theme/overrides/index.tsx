import { merge } from 'lodash';

import { Theme } from '@mui/material';

import { button } from './components/button';
import { defaultProps } from './default-props';
import { cssBaseline } from './components/css-baseline';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = merge(defaultProps(theme), cssBaseline(theme), button(theme));

  return components;
}
