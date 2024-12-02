import React from 'react';
import { m } from 'framer-motion';
import { Draggable } from '@hello-pangea/dnd';

import { Box, Chip, Paper, Stack, SxProps, useTheme, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fToNow } from 'src/utils/format-time';

import { bgBlur } from 'src/theme/css';
import { useAppDispatch } from 'src/store/hooks';
import { Todo, deleteTodo, updateTodo } from 'src/store/slices/todo-slice';

import { varFade } from '../animate';
import TodoListDetails from './todo-list-details';

// ----------------------------------------------------------------------

interface TodoListItemProps {
  todo: Todo;
  index: number;
  sx?: SxProps;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, index, sx, ...other }) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const openDetails = useBoolean(false);

  return (
    <Box component={m.div} {...varFade({ durationIn: 0.2 }).inDown}>
      <Draggable draggableId={todo.id} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={openDetails.onTrue}
            sx={{
              width: 1,
              marginY: 1,
              borderRadius: 1.5,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: todo.completed ? 'success.lighter' : 'info.lighter',
              overflow: 'hidden',
              position: 'relative',
              bgcolor: 'background.default',
              boxShadow: theme.customShadows.z1,
              '&:hover': {
                boxShadow: theme.customShadows.z20,
              },
              ...(openDetails.value && {
                boxShadow: theme.customShadows.z20,
              }),
              ...(snapshot.isDragging && {
                boxShadow: theme.customShadows.z20,
                ...bgBlur({
                  opacity: 0.48,
                  color: theme.palette.background.default,
                }),
              }),
              ...sx,
            }}
            {...other}
          >
            <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">{todo.title}</Typography>
                <Chip
                  size="small"
                  label={todo.completed ? 'Completed' : 'Active'}
                  color={todo.completed ? 'success' : 'info'}
                />
              </Stack>
              {todo.description && todo.description.length > 0 && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {todo.description}
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {fToNow(todo.createdAt)}
              </Typography>
            </Stack>
          </Paper>
        )}
      </Draggable>
      <TodoListDetails
        details={openDetails}
        todo={todo}
        open={openDetails.value}
        onClose={openDetails.onFalse}
        onUpdateTodo={(updatedTodo) => dispatch(updateTodo(updatedTodo))}
        onDeleteTodo={() => dispatch(deleteTodo(todo.id))}
      />
    </Box>
  );
};

export default TodoListItem;
