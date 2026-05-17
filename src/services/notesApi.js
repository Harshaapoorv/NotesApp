import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const notesApi = createApi({
  reducerPath: 'notesApi',

  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
  }),

  tagTypes: ['Notes'],

  keepUnusedDataFor: 300,

  endpoints: builder => ({
    getNotes: builder.query({
      query: () => '/notes',

      providesTags: ['Notes'],
    }),

    getNoteById: builder.query({
      query: id => `/notes/${id}`,

      providesTags: ['Notes'],
    }),

    createNote: builder.mutation({
      query: body => ({
        url: '/notes',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Notes'],
    }),

    updateNote: builder.mutation({
      query: body => ({
        url: `/notes/${body.id}`,
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['Notes'],
    }),

    updateStatus: builder.mutation({
      query: id => ({
        url: `/notes/${id}`,
        method: 'PATCH',
      }),

      invalidatesTags: ['Notes'],
    }),

    updateStar: builder.mutation({
      query: ({ id, is_starred }) => ({
        url: `/notes/${id}/star`,
        method: 'PATCH',
        body: { is_starred: is_starred },
      }),

      invalidatesTags: ['Notes'],
    }),

    deleteNote: builder.mutation({
      query: id => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Notes'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useUpdateStatusMutation,
  useUpdateStarMutation,
  useDeleteNoteMutation,
} = notesApi;
