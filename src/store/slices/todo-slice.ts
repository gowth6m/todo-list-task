import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: number;
}

interface TodoState {
  todos: Todo[];
}

// ----------------------------------------------------------------------

const initialState: TodoState = {
  todos: [],
};

// ----------------------------------------------------------------------

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: Date.now(),
        description: '',
      });
    },
    //
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    //
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    //
    reorderTodos: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const [movedItem] = state.todos.splice(action.payload.sourceIndex, 1);
      state.todos.splice(action.payload.destinationIndex, 0, movedItem);
    },
    //
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
  },
});

// ----------------------------------------------------------------------

export const { addTodo, toggleTodo, deleteTodo, reorderTodos, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
