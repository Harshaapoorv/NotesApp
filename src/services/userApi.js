import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from './baseQuery/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: baseQueryWithReauth,

  tagTypes: ['User'],

  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),

      providesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
