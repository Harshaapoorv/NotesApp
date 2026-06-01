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

    verifyOtp: builder.mutation({
      query: body => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: body => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: body => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: body => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body,
      }),
    }),

    googleAuth: builder.mutation({
      query: body => ({
        url: '/auth/google',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useGoogleAuthMutation,
} = authApi;
