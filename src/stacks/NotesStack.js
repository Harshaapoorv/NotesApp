import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/notes/Home';

import NoteScreen from '../screens/notes/NoteScreen';

const Stack = createStackNavigator();

const NotesStack = () => {
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

export default NotesStack;
