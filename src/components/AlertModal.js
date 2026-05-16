import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import Close from '../assets/icons/Close.jsx';
import ErrorIcon from '../assets/icons/ErrorIcon.jsx';
import Button from './Button.js';

const AlertModal = ({
  isAlertModalVisible,
  setIsAlertModalVisible,
  title,
  description,
  onClose,
  primaryButtonText,
  primaryButtonHandler,
  primaryButtonStyles,
  primaryButtonTextStyles,
  primaryButtonLoading,
  secondaryButtonText,
  secondaryButtonHandler,
  secondaryButtonStyles,
  secondaryButtonTextStyles,
  secondaryButtonLoading,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isAlertModalVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} onPress={onClose}>
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.header}>
              <ErrorIcon width={24} height={24} />
              <Text style={styles.title}>{title}</Text>
              <Pressable
                onPress={() => {
                  setIsAlertModalVisible(false);
                  onClose();
                }}
              >
                <Close width={20} height={20} />
              </Pressable>
            </View>

            {/* Description */}
            <Text style={styles.description}>{description}</Text>

            {/* CTA */}
            <View style={styles.buttonsContainer}>
              {primaryButtonText && (
                <Button
                  title={primaryButtonText}
                  variantType="primary"
                  isLoading={primaryButtonLoading}
                  loaderColor={
                    primaryButtonTextStyles?.color || styles.buttonText.color
                  }
                  additionalStyles={primaryButtonStyles}
                  textStyles={primaryButtonTextStyles}
                  onPress={() => {
                    primaryButtonHandler
                      ? primaryButtonHandler()
                      : setIsAlertModalVisible(false);
                  }}
                />
              )}
              {secondaryButtonText && (
                <Button
                  title={secondaryButtonText}
                  variantType="secondary"
                  isLoading={secondaryButtonLoading}
                  loaderColor={
                    secondaryButtonTextStyles?.color ||
                    styles.secondaryButtonText.color
                  }
                  additionalStyles={
                    secondaryButtonStyles || styles.secondaryButton
                  }
                  textStyles={
                    secondaryButtonTextStyles || styles.secondaryButtonText
                  }
                  onPress={() => {
                    secondaryButtonHandler
                      ? secondaryButtonHandler()
                      : setIsAlertModalVisible(false);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modal: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    width: '80%',
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
  },

  button: {
    backgroundColor: '#165DFC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonsContainer: {
    gap: 12,
  },
});

export default AlertModal;
