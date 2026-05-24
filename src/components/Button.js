import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Add from '../assets/icons/Add.jsx';
import Delete from '../assets/icons/Delete.jsx';
import Loader from './Loader.js';

const Button = ({
  onPress,
  title,
  additionalStyles,
  isIcon = false,
  isAdd = false,
  isDelete = false,
  variantType = 'primary',
  isDisabled = false,
  textStyles,
  isLoading = false,
  loaderColor = '#fff',
  LeftIcon,
  leftIconFill,
}) => {
  return (
    <Pressable
      onPress={!isDisabled && !isLoading ? onPress : undefined}
      style={[
        styles.button,
        styles[`${variantType}Button`],
        isDisabled && styles.disabled,
        additionalStyles,
      ]}
    >
      {isLoading ? (
        <Loader color={loaderColor} />
      ) : (
        <>
          {isIcon && isAdd && <Add width={16} height={16} />}
          {isIcon && isDelete && <Delete width={16} height={16} />}
          {LeftIcon && <LeftIcon color={leftIconFill} width={16} height={16} />}
          <Text
            style={[
              styles.buttonText,
              styles[`${variantType}ButtonText`],
              textStyles,
            ]}
          >
            {title}
          </Text>
        </>
      )}
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
