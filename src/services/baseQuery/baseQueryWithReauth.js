import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Config from 'react-native-config';

import {
  setCredentials,
  showSessionExpiredModal,
} from '../../redux/slices/authSlice';

import {
  getRefreshToken,
  saveRefreshToken,
} from '../../shared/auth/authStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

let isRefreshing = false;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // ACCESS TOKEN EXPIRED
  if (result?.error?.status === 401 && !isRefreshing) {
    isRefreshing = true;
    if (args?.url === '/auth/refresh-token') {
      api.dispatch(showSessionExpiredModal());
      isRefreshing = false;
      return result;
    }

    try {
      const refreshToken = await getRefreshToken();

      // NO REFRESH TOKEN
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      // REFRESH ACCESS TOKEN
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-token',

          method: 'POST',

          body: {
            refresh_token: refreshToken,
          },
        },

        api,
        extraOptions,
      );

      // REFRESH SUCCESS
      if (refreshResult?.data) {
        const { access_token, refresh_token, user } = refreshResult.data;

        // SAVE NEW REFRESH TOKEN
        await saveRefreshToken(refresh_token);

        // UPDATE REDUX STATE
        api.dispatch(
          setCredentials({
            accessToken: access_token,

            user,
          }),
        );

        isRefreshing = false;

        // RETRY ORIGINAL REQUEST
        result = await baseQuery(args, api, extraOptions);
      } else {
        throw new Error('Refresh token invalid');
      }
    } catch (error) {
      api.dispatch(showSessionExpiredModal());
      isRefreshing = false;
    } finally {
      isRefreshing = false;
    }
  }

  return result;
};

export default baseQueryWithReauth;
