import {
  Stack,
  Drawer,
  Button,
  Divider,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  DrawerProps,
} from '@mui/material';

import { fToNow } from 'src/utils/format-time';

import { Todo } from 'src/store/slices/todo-slice';

import Iconify from '../iconify';
import Scrollbar from '../scrollbar';

// ----------------------------------------------------------------------

interface TodoListDetailsProps extends DrawerProps {
  details: any;
  todo: Todo;
  open: boolean;
  onClose: VoidFunction;
  //
  onUpdateTodo: (updateTodo: Todo) => void;
  onDeleteTodo: VoidFunction;
}

// ----------------------------------------------------------------------

const TodoListDetails = ({
  details,
  todo,
  open,
  onClose,
  onUpdateTodo,
  onDeleteTodo,
  ...other
}: TodoListDetailsProps) => {
  const renderField = (label: string, field: keyof Todo, value: string | number | undefined) => (
    <Stack direction={'column'} justifyContent={'space-between'} gap={1}>
      <Typography variant={'overline'} sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) =>
          onUpdateTodo({
            ...todo,
            [field]: e.target.value,
          })
        }
      />
    </Stack>
  );

  const renderHead = (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2.5 }}>
      <IconButton onClick={onClose}>
        <Iconify icon="eva:close-fill" width={20} height={20} />
      </IconButton>
    </Stack>
  );

  const renderMarkAsComplete = (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
      <Typography variant={'overline'} sx={{ color: 'text.secondary' }}>
        Complete
      </Typography>
      <Checkbox
        color={'success'}
        checked={todo.completed}
        onChange={() => onUpdateTodo({ ...todo, completed: !todo.completed })}
      />
    </Stack>
  );

  const renderBody = (
    <Stack spacing={2} sx={{ p: 2.5 }}>
      {renderField('Title', 'title', todo.title)}
      {renderField('Description', 'description', todo.description ?? '')}
      {renderField('Created at', 'createdAt', fToNow(todo.createdAt))}
      {renderMarkAsComplete}

      <Button variant={'contained'} onClick={onDeleteTodo}>
        Close
      </Button>

      <Button
        variant={'outlined'}
        sx={{
          borderColor: (theme) => theme.palette.text.primary,
        }}
        onClick={onDeleteTodo}
      >
        Delete
      </Button>
    </Stack>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
      {...other}
    >
      {renderHead}

      <Divider />

      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 5,
            px: 2.5,
          }}
        >
          {renderBody}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
};

export default TodoListDetails;
