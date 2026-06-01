import { configureStore } from '@reduxjs/toolkit';

import { notesApi } from '../services/notesApi';

import { authApi } from '../services/authApi';

import { userApi } from '../services/userApi';

import { appApi } from '../services/appApi';

import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [notesApi.reducerPath]: notesApi.reducer,

    [authApi.reducerPath]: authApi.reducer,

    [userApi.reducerPath]: userApi.reducer,

    [appApi.reducerPath]: appApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      notesApi.middleware,
      authApi.middleware,
      userApi.middleware,
      appApi.middleware,
    ),
});

export default store;
