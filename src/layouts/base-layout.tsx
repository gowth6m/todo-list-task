import { Box, SxProps } from '@mui/material';
import Container from '@mui/material/Container';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from './config-layout';
import Header from './common/header-simple';

// ----------------------------------------------------------------------

const SPACING = 8;

type Props = {
  children: React.ReactNode;
  sx?: SxProps;
};

export default function BaseLayout({ children, sx }: Props) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <>
      <Header />

      <Container component="main">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            py: `${HEADER.H_MOBILE + SPACING}px`,
            ...(lgUp && {
              px: 2,
              py: `${HEADER.H_DESKTOP + SPACING}px`,
            }),
            ...sx,
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
