import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotebookPen, CircleUserRound } from 'lucide-react-native';

import NotesStack from '../stacks/NotesStack';

import MoreStack from '../stacks/MoreStack';

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#2457FF';

const INACTIVE_COLOR = '#98A2B3';

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarStyle: {
          height: 48,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#EAECF0',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarActiveTintColor: ACTIVE_COLOR,

        tabBarInactiveTintColor: INACTIVE_COLOR,
      }}
    >
      <Tab.Screen
        name="Notes"
        component={NotesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <NotebookPen color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
