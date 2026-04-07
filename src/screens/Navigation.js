import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Home';
import NoteScreen from './NoteScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer initialState={{ routes: [{ name: 'Home' }] }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
