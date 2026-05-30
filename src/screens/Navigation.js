import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import ExpiredScreen from './ExpiredScreen';

// AUTH SCREENS
import LaunchScreen from './LaunchScreen';
import Login from './Login';
import SignUp from './SignUp';
import VerifyYourEmail from './VerifyYourEmail';
import SuccessScreen from './SuccessScreen';
import ForgotPassword from './ForgotPassword';
import CreateNewPassword from './CreateNewPassword';

// APP SCREENS
import Splash from './Splash';
import HomeScreen from './Home';
import NoteScreen from './NoteScreen';

const Stack = createStackNavigator();

// =========================
// AUTH STACK
// =========================

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Launch" component={LaunchScreen} />

      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="VerifyYourEmail" component={VerifyYourEmail} />

      <Stack.Screen name="Success" component={SuccessScreen} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
};

// =========================
// APP STACK
// =========================

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Note" component={NoteScreen} />
    </Stack.Navigator>
  );
};

// =========================
// ROOT NAVIGATION
// =========================

const Navigation = () => {
  const { isAuthenticated, isAppReady, isSessionExpiredModalVisible } =
    useSelector(state => state.auth);

  // SPLASH WHILE APP BOOTS
  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isSessionExpiredModalVisible ? (
          <Stack.Navigator
            initialRouteName="Expired"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Expired"
              component={ExpiredScreen}
              initialParams={{ isVisible: isSessionExpiredModalVisible }}
            />
          </Stack.Navigator>
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
