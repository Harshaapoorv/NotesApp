import React from 'react';
import { View, Text } from 'react-native';

const NoteScreen = ({ config }) => {
  return (
    <View>
      <Text>{config?.title}</Text>
    </View>
  );
};

export default NoteScreen;
