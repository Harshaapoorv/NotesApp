import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NotesIcon from '../assets/Notes.svg';
import Button from '../components/Button';
import Google from '../assets/icons/Google.jsx';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import { useNavigation } from '@react-navigation/native';

const LaunchScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <BackgroundDecorations />
      <View style={styles.header}>
        <NotesIcon width={120} height={120} />
        <Text style={styles.title}>
          Notes<Text style={styles.titleDesc}>App</Text>
        </Text>
        <Text style={styles.description}>Write. Organize. Remember</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            title="Sign Up"
            variantType="primary"
            onPress={() => navigation.navigate('SignUp')}
            additionalStyles={styles.getStartedButton}
            textStyles={styles.getStartedButtonText}
          />
          <Button
            title="Log In"
            variantType="secondary"
            onPress={() => navigation.navigate('Login')}
            additionalStyles={styles.loginButton}
            textStyles={styles.loginButtonText}
          />
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.line} />
        </View>
        <Button
          title="Continue with Google"
          variantType="secondary"
          LeftIcon={Google}
          onPress={() => {}}
          additionalStyles={styles.googleButton}
          textStyles={styles.googleButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    height: '60%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  titleDesc: {
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    color: '#667085',
    marginTop: 2,
  },
  footer: {
    width: '100%',
    gap: 24,
    alignSelf: 'flex-end',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  getStartedButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontSize: 12,
    color: '#667085',
    fontWeight: '500',
  },
  googleButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LaunchScreen;
