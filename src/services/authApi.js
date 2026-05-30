import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Config from 'react-native-config';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
  }),

  endpoints: builder => ({
    signup: builder.mutation({
      query: body => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    refreshToken: builder.mutation({
      query: body => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshTokenMutation } =
  authApi;
