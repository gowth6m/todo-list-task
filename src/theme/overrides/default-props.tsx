import { Theme } from '@mui/material';

export function defaultProps(_: Theme) {
  return {
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'inherit',
        disableElevation: true,
      },
    },
  };
}
