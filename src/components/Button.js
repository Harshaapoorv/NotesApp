import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Add from '../assets/icons/Add.jsx';

const Button = ({ onPress, title, additionalStyles }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, additionalStyles]}>
      <Add width={16} height={16} />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#165dfc',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Button;
