import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import { useNetInfo } from '@react-native-community/netinfo';

import Splash from '../screens/common/Splash';

import AuthStack from './AuthStack';

import AppTabs from '../tabs/AppTabs';

import ExpiredSessionStack from './ExpiredSessionStack';

import NoInternetStack from '../stacks/NoInternetStack';

const RootNavigator = () => {
  const { isAuthenticated, isAppReady, isSessionExpiredModalVisible } =
    useSelector(state => state.auth);

  const netInfo = useNetInfo();

  // =========================
  // SPLASH
  // =========================

  if (!isAppReady) {
    return <Splash />;
  }

  // =========================
  // NO INTERNET
  // =========================

  const isOffline =
    netInfo.isConnected === false && netInfo.isInternetReachable === false;

  if (isOffline) {
    return (
      <NavigationContainer>
        <NoInternetStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isSessionExpiredModalVisible ? (
          <ExpiredSessionStack />
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
