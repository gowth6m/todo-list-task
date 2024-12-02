import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { AppConfig } from 'src/configs/app-config';

import todoReducer from './slices/todo-slice';
import settingsReducer from './slices/settings-slice';

// ----------------------------------------------------------------------

const persistConfig = {
  key: AppConfig.localStorageKeys.store,
  storage,
  whitelist: ['settings'],
};

const rootReducer = combineReducers({
  todos: todoReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
