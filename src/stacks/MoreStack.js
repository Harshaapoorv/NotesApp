import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MoreScreen from '../screens/more/MoreScreen';
import ContentScreen from '../screens/more/ContentScreen';
import ContactScreen from '../screens/more/Contact';

const Stack = createStackNavigator();

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MoreHome" component={MoreScreen} />
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default MoreStack;
