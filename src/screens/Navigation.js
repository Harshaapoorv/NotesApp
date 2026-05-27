import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Home';
import NoteScreen from './NoteScreen';
import Splash from './Splash';
import LaunchScreen from './LaunchScreen';
import Login from './Login';
import SignUp from './SignUp';
import VerifyYourEmail from './VerifyYourEmail';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer initialState={{ routes: [{ name: 'Launch' }] }}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyYourEmail"
          component={VerifyYourEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
