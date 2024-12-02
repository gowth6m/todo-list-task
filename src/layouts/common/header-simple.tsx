import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';
import { AppConfig } from 'src/configs/app-config';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';
import HeaderShadow from './header-shadow';
import SettingsButton from './settings-button';

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar elevation={0}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          bgcolor: (theme) => theme.palette.background.default,
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <Logo
            sx={{
              p: 1.5,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            {AppConfig.metadata.title}
          </Typography>
        </Box>

        <SettingsButton />
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
