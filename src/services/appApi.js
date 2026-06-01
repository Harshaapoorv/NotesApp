import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Config from 'react-native-config';

export const appApi = createApi({
  reducerPath: 'appApi',

  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
  }),

  tagTypes: ['AppConfig', 'AppContent'],

  endpoints: builder => ({
    getAppConfig: builder.query({
      query: () => ({
        url: '/app/config',
        method: 'GET',
      }),

      providesTags: ['AppConfig'],
    }),

    getAppContent: builder.query({
      query: () => ({
        url: '/app/content',
        method: 'GET',
      }),

      providesTags: ['AppContent'],
    }),
  }),
});

export const { useGetAppConfigQuery, useGetAppContentQuery } = appApi;
