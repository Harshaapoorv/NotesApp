import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import Button from '../components/Button.js';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';

const SuccessScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    title,
    description,
    onPress,
    buttonText,
    Icon,
    canGoBack = false,
  } = route.params;
  return (
    <View style={styles.container}>
      <BackgroundDecorations />
      {canGoBack && (
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow width={24} height={24} />
        </Pressable>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          {Icon && <Icon width={220} height={120} />}
          <View style={{ gap: 16, marginTop: 24, alignItems: 'center' }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {buttonText && (
          <Button
            title={buttonText}
            onPress={onPress}
            additionalStyles={styles.button}
            textStyles={styles.buttonText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  header: {
    gap: 48,
    alignItems: 'center',
    marginTop: 40,
  },
  content: {
    marginTop: 80,
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#667085',
    marginTop: 2,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SuccessScreen;
