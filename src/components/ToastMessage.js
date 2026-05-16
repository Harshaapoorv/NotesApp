import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToastMessage = ({ message, type = 'default' }) => {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
  default: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  success: {
    backgroundColor: 'rgba(0,128,0,0.7)',
  },
  info: {
    backgroundColor: 'rgba(0,0,255,0.5)',
  },
});

export default ToastMessage;
