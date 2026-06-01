import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ExpiredScreen from '../screens/common/ExpiredScreen';

const Stack = createStackNavigator();

const ExpiredSessionStack = ({ isVisible }) => {
  return (
    <Stack.Navigator
      initialRouteName="Expired"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Expired"
        component={ExpiredScreen}
        initialParams={{
          isVisible,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExpiredSessionStack;
