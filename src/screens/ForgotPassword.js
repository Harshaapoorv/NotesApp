import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import Button from '../components/Button';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import Input from '../components/Input.js';
import { useNavigation } from '@react-navigation/native';
import Mail from '../assets/icons/Mail.jsx';
import { useHeaderHeight } from '@react-navigation/elements';
import { isValidEmail, normalizeEmail } from '../shared/validators/validators';
import { useForgotPasswordMutation } from '../services/authApi.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const [forgotPasswordApi, { isLoading }] = useForgotPasswordMutation();

  const onReset = useCallback(async () => {
    if (email) {
      try {
        const response = await forgotPasswordApi({
          email: normalizeEmail(email),
        }).unwrap();
        if (response?.message === 'OTP sent successfully') {
          navigation.navigate('VerifyYourEmail', {
            email: email,
            flowType: 'reset',
            purpose: response?.purpose,
          });
        }
      } catch (err) {
        if (err?.status === 401) {
          return;
        }
        setIsErrorModalVisible(true);
        setErrorMessage(getErrorMessage(err));
        return;
      }
    }
  }, [forgotPasswordApi, email]);

  const isButtonDisabled = !isValidEmail(email) || isLoading;

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
              <View>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.description}>
                  Don't worry, we'll help you reset it.
                </Text>
              </View>
              <View style={styles.body}>
                <Input
                  placeholder="Email"
                  additionalStyles={styles.input}
                  label="Email"
                  variantType="text"
                  value={email}
                  onChangeText={setEmail}
                  LeftIcon={Mail}
                  isRequired
                  onBlur={() => {
                    if (email.length > 0 && !isValidEmail(email)) {
                      setIsEmailValid(false);
                    } else {
                      setIsEmailValid(true);
                    }
                  }}
                  onFocus={() => {
                    setIsEmailValid(true);
                  }}
                  errorMsg={
                    isEmailValid ? '' : 'Please enter a valid email address.'
                  }
                />
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.buttonsContainer}>
                <Button
                  title="Send Verification Code"
                  variantType="primary"
                  onPress={() => onReset()}
                  additionalStyles={styles.loginButton}
                  textStyles={styles.loginButtonText}
                  isDisabled={isButtonDisabled}
                  isLoading={isLoading}
                />
              </View>
              <Text style={styles.footerText}>
                Remember your password?{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.goBack()}
                >
                  Log In
                </Text>
              </Text>
            </View>
            <ErrorModal
              isErrorModalVisible={isErrorModalVisible}
              setIsErrorModalVisible={setIsErrorModalVisible}
              title={errorMessage?.title}
              description={errorMessage?.description}
              onClose={onCloseErrorModal}
            />
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
    marginTop: 80,
    alignItems: 'flex-start',
    gap: 32,
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
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    gap: 24,
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

export default ForgotPassword;
