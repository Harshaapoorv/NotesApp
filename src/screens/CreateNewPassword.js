import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import Button from '../components/Button';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import Input from '../components/Input.js';
import { useNavigation } from '@react-navigation/native';
import Lock from '../assets/icons/Lock.jsx';
import ResetSuccess from '../assets/icons/ResetSuccess.jsx';
import { useHeaderHeight } from '@react-navigation/elements';
import PasswordRules from '../components/PasswordRules.js';
import {
  getPasswordChecks,
  isValidPassword,
  doPasswordsMatch,
  isValidEmail,
} from '../shared/validators/validators';

const CreateNewPassword = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChecks = getPasswordChecks(password);

  const passwordsMatch = doPasswordsMatch(password, confirmPassword);

  const isPasswordValid = isValidPassword(password);

  const isLoading = false; // Placeholder for loading state, replace with actual state when integrating API

  const isButtonDisabled = !isPasswordValid || !passwordsMatch || isLoading;

  const onResetPassword = () => {
    navigation.navigate('Success', {
      title: 'Password reset successful!',
      description:
        'Your password has been reset successfully. You can now use your new password to log in to your account.',
      onPress: () => navigation.navigate('Login'),
      buttonText: 'Go to Login',
      Icon: ResetSuccess,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ backgroundColor: '#ffffff' }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.screen}>
            <BackgroundDecorations />
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <BackArrow width={24} height={24} />
            </Pressable>

            <View style={styles.header}>
              <Text style={styles.title}>Create new password</Text>
              <Text style={styles.description}>
                Your new password must be different from your previous
                passwords.
              </Text>
              <View style={styles.body}>
                <Input
                  placeholder="New password"
                  label="Password"
                  additionalStyles={styles.input}
                  LeftIcon={Lock}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  showPasswordToggle={showPassword}
                  setShowPassword={setShowPassword}
                  variantType="text"
                  isRequired
                />
                <Input
                  placeholder="Confirm password"
                  label="Confirm Password"
                  additionalStyles={styles.input}
                  LeftIcon={Lock}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  showPasswordToggle={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  variantType="text"
                  isRequired
                />
                <PasswordRules
                  passwordChecks={passwordChecks}
                  passwordsMatch={passwordsMatch}
                  showMatchRule={confirmPassword.length > 0}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.buttonsContainer}>
                <Button
                  title="Reset Password"
                  variantType="primary"
                  onPress={() => onResetPassword()}
                  additionalStyles={styles.loginButton}
                  textStyles={styles.loginButtonText}
                  isDisabled={isButtonDisabled}
                />
              </View>
              <Text style={styles.footerText}>
                Remember password?{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.navigate('Login')}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
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
    width: '100%',
    marginTop: 48,
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: '#667085',
    marginTop: 2,
    fontWeight: '500',
  },
  body: {
    paddingTop: 24,
    paddingBottom: 16,
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  passwordCriteria: {
    width: '100%',
    marginBottom: 8,
    gap: 8,
    alignItems: 'flex-start',
  },
  passwordCriteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passwordCriteriaText: {
    fontSize: 14,
    color: '#4B5563',
  },
  footer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
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
    marginTop: 4,
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
  footerText: {
    fontSize: 14,
    color: '#667085',
    marginTop: 12,
  },
  signUpText: {
    color: '#2563EB',
    fontWeight: '500',
  },
});

export default CreateNewPassword;
