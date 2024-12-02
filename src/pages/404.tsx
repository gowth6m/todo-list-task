import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { Box, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Helmet>
        <title>404 Page Not Found!</title>
      </Helmet>

      <MotionContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3">Sorry, Page Not Found!</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            {`Sorry, we couldn’t find the page you’re looking for!`}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in} style={{ marginTop: 4, marginBottom: 4 }}>
          <Typography sx={{ color: 'text.secondary' }} variant="h1">
            404!
          </Typography>
        </m.div>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            onClick={() => {
              router.back();
            }}
            size="large"
            variant="outlined"
            sx={{
              width: 120,
            }}
          >
            Back
          </Button>
          <Button component={RouterLink} href="/" size="large" variant="contained">
            Go Home
          </Button>
        </Box>
      </MotionContainer>
    </>
  );
}
