import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Add from '../assets/icons/Add.jsx';

const Button = ({
  onPress,
  title,
  additionalStyles,
  isIcon = false,
  variantType = 'primary',
  isDisabled = false,
}) => {
  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      style={[
        styles.button,
        styles[`${variantType}Button`],
        isDisabled && styles.disabled,
        additionalStyles,
      ]}
    >
      {isIcon && <Add width={16} height={16} />}
      <Text style={[styles.buttonText, styles[`${variantType}ButtonText`]]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.6,
  },
  primaryButton: {
    backgroundColor: '#165dfc',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondaryButtonText: {
    color: '#353535',
  },
});

export default Button;
