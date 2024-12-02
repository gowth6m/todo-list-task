import React, { useState } from 'react';
import { Droppable, DragDropContext } from '@hello-pangea/dnd';

import {
  Box,
  Card,
  Stack,
  Tooltip,
  TextField,
  Container,
  IconButton,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  Todo,
  addTodo,
  clearTodos,
  reorderTodos,
  saveToLocalStorage,
} from 'src/store/slices/todo-slice';

import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import TodoListItem from './todo-list-item';
import TodoListIntroToast from './todo-list-intro-toast';

// ----------------------------------------------------------------------

const TodoListView: React.FC = () => {
  const [text, setText] = useState('');

  const [error, setError] = useState('');

  const [toastOpen, setToastOpen] = useState(true);

  const dispatch = useAppDispatch();

  const { todos, inSyncWithLocalStorage } = useAppSelector((state) => state.todos);

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

  const handleSaveToLocalStorage = () => {
    dispatch(saveToLocalStorage());
  };

  const handleClearTodos = () => {
    dispatch(clearTodos());
  };

  // ----------------- RENDERS ----------------------------

  const renderHeaderSection = (
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
        component={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
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

        <Tooltip title="Add Todo" arrow>
          <IconButton
            color="primary"
            type="submit"
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
        </Tooltip>
        <Tooltip title="Save todos to local storage" arrow>
          <IconButton
            color="primary"
            onClick={handleSaveToLocalStorage}
            disabled={inSyncWithLocalStorage}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              color: 'secondary.contrastText',
              bgcolor: 'secondary.main',
              '&:hover': { bgcolor: 'secondary.darker' },
            }}
          >
            <Iconify icon="mdi:content-save" width={24} height={24} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear all todos" arrow>
          <IconButton
            color="primary"
            onClick={handleClearTodos}
            disabled={!todos.length}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              color: 'error.contrastText',
              bgcolor: 'error.main',
              '&:hover': { bgcolor: 'error.darker' },
            }}
          >
            <Iconify icon="mdi:refresh" width={24} height={24} />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );

  const renderEmptyTodoListMessage = (
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
  );

  const renderDisplayTodos = (
    <Card variant="outlined">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <Box height={'calc(100vh - 300px)'} overflow={'hidden'}>
              <Scrollbar
                sx={{
                  height: '100%',
                }}
              >
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  padding={3}
                  height={'100%'}
                >
                  {!todos.length ? (
                    renderEmptyTodoListMessage
                  ) : (
                    <>
                      {todos.map((todo: Todo, index: number) => (
                        <TodoListItem key={todo.id} todo={todo} index={index} />
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </Stack>
              </Scrollbar>{' '}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
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
        {renderHeaderSection}

        {renderDisplayTodos}

        <TodoListIntroToast open={toastOpen} onClose={handleCloseToast} />
      </Box>
    </Container>
  );
};

export default TodoListView;
