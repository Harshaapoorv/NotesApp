import { configureStore } from '@reduxjs/toolkit';

import { notesApi } from '../services/notesApi';

import { authApi } from '../services/authApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [notesApi.reducerPath]: notesApi.reducer,

    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(notesApi.middleware, authApi.middleware),
});

export default store;
