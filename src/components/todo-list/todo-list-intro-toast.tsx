import React from 'react';

import { Alert, Snackbar, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface TodoListIntroToastProps {
  open: boolean;
  onClose: () => void;
}

const TodoListIntroToast: React.FC<TodoListIntroToastProps> = ({ open, onClose }) => (
  <Snackbar
    open={open}
    onClose={onClose}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    sx={{
      width: {
        xs: '100%',
        md: 400,
      },
    }}
  >
    <Alert onClose={onClose} severity="info" sx={{ width: '100%' }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Welcome to the Todo App 👋
      </Typography>
      <Typography variant="body2">
        Add your tasks and drag to reorder them. You can also click on a task to view more details.
      </Typography>
    </Alert>
  </Snackbar>
);

export default TodoListIntroToast;
