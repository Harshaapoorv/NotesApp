import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

import Close from '../assets/icons/Close.jsx';
import ErrorIcon from '../assets/icons/ErrorIcon.jsx';

const ErrorModal = ({
  isErrorModalVisible,
  setIsErrorModalVisible,
  title,
  description,
  onClose,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isErrorModalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <ErrorIcon width={24} height={24} />
            <Text style={styles.title}>{title}</Text>
            <Pressable
              onPress={() => {
                setIsErrorModalVisible(false);
                onClose();
              }}
            >
              <Close width={20} height={20} />
            </Pressable>
          </View>

          {/* Description */}
          <Text style={styles.description}>{description}</Text>

          {/* CTA */}
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsErrorModalVisible(false);
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Got it</Text>
          </Pressable>
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },

  title: {
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
});

export default ErrorModal;
