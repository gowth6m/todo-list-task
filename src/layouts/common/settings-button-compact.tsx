import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Theme, SxProps } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useAppDispatch } from 'src/store/hooks';
import { toggleDrawer } from 'src/store/slices/settings-slice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SettingsButtonCompact({ sx }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={true}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Box>
        <IconButton
          aria-label="settings"
          onClick={() => dispatch(toggleDrawer())}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Iconify icon="solar:settings-bold-duotone" width={24} />
        </IconButton>
      </Box>
    </Badge>
  );
}
