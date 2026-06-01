import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import Splash from '../screens/common/Splash';

import AuthStack from './AuthStack';

import AppTabs from '../tabs/AppTabs';

import ExpiredSessionStack from './ExpiredSessionStack';

const RootNavigator = () => {
  const { isAuthenticated, isAppReady, isSessionExpiredModalVisible } =
    useSelector(state => state.auth);

  // =========================
  // SPLASH
  // =========================

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isSessionExpiredModalVisible ? (
          <ExpiredSessionStack isVisible={isSessionExpiredModalVisible} />
        ) : (
          <AppTabs />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
