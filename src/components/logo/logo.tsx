import { forwardRef } from 'react';

import { Box, SxProps, CardMedia, Link as MuiLink } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useAppSelector } from 'src/store/hooks';
import { AppConfig } from 'src/configs/app-config';

interface LogoProps {
  disabledLink?: boolean;
  squareLogo?: boolean;
  sx?: SxProps;
}

// ----------------------------------------------------------------------

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, squareLogo = false, sx, ...other }, ref) => {
    const theme = useAppSelector((state) => state.settings.theme);

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 'fit-content',
          height: 50,
          display: 'flex',
          flexDirection: squareLogo ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          ...sx,
        }}
        {...other}
      >
        <CardMedia
          component={'img'}
          src={AppConfig.assets.appLogoTransparent}
          alt={'Logo'}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: theme === 'light' ? 'invert(1)' : undefined,
          }}
        />
      </Box>
    );

    const square = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 'fit-content',
          height: 50,
          display: 'flex',
          flexDirection: squareLogo ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          ...sx,
        }}
        {...other}
      >
        <CardMedia
          component={'img'}
          src={AppConfig.assets.appLogo}
          alt={'Logo'}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    );

    if (disabledLink) {
      return squareLogo ? square : logo;
    }

    return (
      <MuiLink
        component={RouterLink}
        href={AppConfig.links.landingPage}
        sx={{ display: 'contents' }}
      >
        {squareLogo ? square : logo}
      </MuiLink>
    );
  }
);

Logo.displayName = 'Logo';
export default Logo;
