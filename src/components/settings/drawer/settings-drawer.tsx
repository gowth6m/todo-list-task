import Stack from '@mui/material/Stack';
import { Box, Link } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { AppConfig } from 'src/configs/app-config';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setTheme, ThemeMode, toggleDrawer } from 'src/store/slices/settings-slice';

import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
import BaseOptions from './base-option';

// ----------------------------------------------------------------------

export default function SettingsDrawer() {
  const settings = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const labelStyles = {
    mb: 1.5,
    color: 'text.disabled',
    fontWeight: 'fontWeightSemiBold',
  };

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <IconButton onClick={() => dispatch(toggleDrawer())}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderMode = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Theme Mode
      </Typography>

      <BaseOptions
        value={settings.theme}
        onChange={(newValue: string) => dispatch(setTheme(newValue as ThemeMode))}
        options={['light', 'dark']}
        icons={['solar:sun-bold', 'solar:moon-bold']}
      />
    </div>
  );

  const renderAppInfo = (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Created by{' '}
        <Link href={AppConfig.links.landingPage} target={'_blank'} color={'text.primary'}>
          Gowth6m
        </Link>{' '}
        👋
      </Typography>

      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        <Link href={AppConfig.links.landingPage} target={'_blank'} color={'text.primary'}>
          GitHub
        </Link>{' '}
        {AppConfig.metadata.version !== '' &&
          !!AppConfig.metadata.version &&
          `${AppConfig.metadata.version}`}
      </Typography>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.drawer}
      onClose={() => dispatch(toggleDrawer())}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: 280,
        },
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {renderMode}
        </Stack>
      </Scrollbar>
      <Stack spacing={3} sx={{ p: 3 }}>
        {renderAppInfo}
      </Stack>
    </Drawer>
  );
}
