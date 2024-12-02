import React, { useState } from 'react';
import { Droppable, DragDropContext } from '@hello-pangea/dnd';

import {
  Box,
  Card,
  Stack,
  TextField,
  Container,
  IconButton,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Todo, addTodo, reorderTodos } from 'src/store/slices/todo-slice';

import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import TodoListItem from './todo-list-item';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const TodoListView: React.FC = () => {
  const [text, setText] = useState('');

  const [error, setError] = useState('');

  const [toastOpen, setToastOpen] = useState(true);

  const lgUp = useResponsive('up', 'lg');

  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.todos);

  // ----------------- HANDLERS ---------------------------

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
      setError('');
    } else {
      setError('Please enter a valid todo');
    }
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      reorderTodos({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  // ----------------- RENDERS ----------------------------

  const renderAddTodo = (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        width: 1,
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: !!error ? 'flex-start' : 'center',
          justifyContent: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          color={'secondary'}
          label="Add a new todo"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />

        <IconButton
          color="primary"
          onClick={handleAddTodo}
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            color: 'primary.contrastText',
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.darker' },
          }}
        >
          <Iconify icon="mdi:plus" width={24} height={24} />
        </IconButton>
      </Box>
    </Card>
  );

  const renderDisplayTodos = (
    <Card
      variant="outlined"
      sx={{
        height: 'calc(100vh - 300px)',
      }}
    >
      <Scrollbar>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todoList">
            {(provided) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                spacing={2}
                sx={{
                  py: 3,
                  px: 3,
                }}
              >
                {todos.length === 0 ? (
                  <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'calc(100vh - 400px)'}
                    gap={2}
                  >
                    <Typography variant={'h5'} color={'text.disabled'}>
                      No todos yet
                    </Typography>
                    <Typography variant={'body2'} color={'text.disabled'}>
                      Add a new todo to get started
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    {todos.map((todo: Todo, index: number) => (
                      <TodoListItem key={todo.id} todo={todo} index={index} />
                    ))}
                  </>
                )}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollbar>
    </Card>
  );

  const renderToast = (
    <Snackbar
      open={toastOpen}
      onClose={handleCloseToast}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: lgUp ? 'right' : 'center' }}
      sx={{
        width: {
          xs: '100%',
          md: 400,
        },
      }}
    >
      <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Welcome to the Todo App 👋
        </Typography>
        <Typography variant="body2">
          Add your tasks and drag to reorder them. You can also click on a task to view more
          details.
        </Typography>
      </Alert>
    </Snackbar>
  );

  return (
    <Container maxWidth={'md'}>
      <Box
        width={1}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        gap={3}
      >
        {renderAddTodo}

        {renderDisplayTodos}

        {renderToast}
      </Box>
    </Container>
  );
};

export default TodoListView;
