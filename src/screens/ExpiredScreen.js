import React from 'react';

import { View } from 'react-native';
import ErrorModal from '../components/ErrorModal.js';
import { hideSessionExpiredModal } from '../redux/slices/authSlice.js';
import { logout } from '../redux/slices/authSlice.js';
import { notesApi } from '../services/notesApi.js';
import { authApi } from '../services/authApi.js';
import { clearRefreshToken } from '../shared/auth/authStorage.js';
import { useDispatch } from 'react-redux';

const ExpiredScreen = ({ isVisible }) => {
  const dispatch = useDispatch();

  const onCloseSessionExpired = async () => {
    await clearRefreshToken();

    dispatch(hideSessionExpiredModal());

    dispatch(logout());

    dispatch(notesApi.util.resetApiState());

    dispatch(authApi.util.resetApiState());
  };

  return (
    <View>
      <ErrorModal
        isErrorModalVisible={isVisible}
        setIsErrorModalVisible={() => {}}
        title="Session Expired"
        description="Your session has expired. Please login again to continue."
        onClose={() => onCloseSessionExpired()}
      />
    </View>
  );
};

export default ExpiredScreen;
