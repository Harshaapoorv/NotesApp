import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,

  accessToken: null,

  isAuthenticated: false,

  isAppReady: false,

  isSessionExpiredModalVisible: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.isAuthenticated = true;
    },

    logout: state => {
      state.user = null;

      state.accessToken = null;

      state.isAuthenticated = false;
    },

    showSessionExpiredModal: state => {
      if (!state.isSessionExpiredModalVisible) {
        state.isSessionExpiredModalVisible = true;
      }
    },

    hideSessionExpiredModal: state => {
      if (state.isSessionExpiredModalVisible) {
        state.isSessionExpiredModalVisible = false;
      }
    },

    setAppReady: (state, action) => {
      state.isAppReady = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAppReady,
  showSessionExpiredModal,
  hideSessionExpiredModal,
} = authSlice.actions;

export default authSlice.reducer;
