import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// AUTH SCREENS
import LaunchScreen from '../screens/auth/LaunchScreen';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import VerifyYourEmail from '../screens/common/VerifyYourEmail';
import SuccessScreen from '../screens/common/SuccessScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import CreateNewPassword from '../screens/common/CreateNewPassword';

const Stack = createStackNavigator();

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

export default AuthStack;
