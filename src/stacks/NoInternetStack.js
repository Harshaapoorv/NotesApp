import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import NoInternet from '../screens/common/NoInternet';

const Stack = createStackNavigator();

const NoInternetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NoInternet" component={NoInternet} />
    </Stack.Navigator>
  );
};

export default NoInternetStack;
