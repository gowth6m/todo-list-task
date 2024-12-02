import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppConfig } from 'src/configs/app-config';

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
  inSyncWithLocalStorage: boolean;
}

// ----------------------------------------------------------------------

const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(AppConfig.localStorageKeys.todos);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return [];
  }
};

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  inSyncWithLocalStorage: true,
};

// ----------------------------------------------------------------------

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.unshift({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: Date.now(),
        description: '',
      });
      state.inSyncWithLocalStorage = false;
    },
    //
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.inSyncWithLocalStorage = false;
      }
    },
    //
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      state.inSyncWithLocalStorage = false;
    },
    //
    reorderTodos: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const [movedItem] = state.todos.splice(action.payload.sourceIndex, 1);
      state.todos.splice(action.payload.destinationIndex, 0, movedItem);
      state.inSyncWithLocalStorage = false;
    },
    //
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        state.inSyncWithLocalStorage = false;
      }
    },
    //
    saveToLocalStorage: (state) => {
      try {
        localStorage.setItem(AppConfig.localStorageKeys.todos, JSON.stringify(state.todos));
        state.inSyncWithLocalStorage = true;
      } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
      }
    },
    //
    loadFromLocalStorage: (state) => {
      try {
        const todos = loadTodosFromLocalStorage();
        state.todos = todos;
        state.inSyncWithLocalStorage = true;
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    },
    // 
    clearTodos: (state) => {
      state.todos = [];
      state.inSyncWithLocalStorage = false;
    }
  },
});

// ----------------------------------------------------------------------

export const {
  addTodo,
  clearTodos,
  toggleTodo,
  deleteTodo,
  reorderTodos,
  updateTodo,
  saveToLocalStorage,
  loadFromLocalStorage,
} = todoSlice.actions;
export default todoSlice.reducer;
