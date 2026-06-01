import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import BackArrow from '../assets/icons/SmallBack.jsx';
import Button from '../components/Button';
import Google from '../assets/icons/Google.jsx';
import BackgroundDecorations from '../components/BackgroundDecorations.jsx';
import Input from '../components/Input.js';
import { useNavigation } from '@react-navigation/native';
import Mail from '../assets/icons/Mail.jsx';
import Lock from '../assets/icons/Lock.jsx';
import Profile from '../assets/icons/Profile.jsx';
import { useSignupMutation } from '../services/authApi.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import PasswordRules from '../components/PasswordRules.js';
import {
  getPasswordChecks,
  isValidPassword,
  doPasswordsMatch,
  isValidEmail,
  normalizeEmail,
  isValidFullName,
} from '../shared/validators/validators';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { useGoogleAuthMutation } from '../services/authApi';

import { setCredentials } from '../redux/slices/authSlice';

import { saveRefreshToken } from '../shared/auth/authStorage';

import { useDispatch } from 'react-redux';

const SignUp = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordChecks = getPasswordChecks(password);

  const passwordsMatch = doPasswordsMatch(password, confirmPassword);

  const isPasswordValid = isValidPassword(password);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFullNameValid, setIsFullNameValid] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const [signUp, { data, isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const [googleAuthApi] = useGoogleAuthMutation();

  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('Google token not found');
      }

      const response = await googleAuthApi({
        id_token: idToken,
      }).unwrap();

      await saveRefreshToken(response.refresh_token);

      dispatch(
        setCredentials({
          accessToken: response.access_token,

          user: response.user,
        }),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }

      console.log('Google Sign In Error', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.message === 'OTP sent successfully') {
        navigation.navigate('VerifyYourEmail', {
          email: email,
          flowType: 'signUp',
          purpose: data?.purpose,
        });
      }
    } else if (isError) {
      setErrorMessage(
        getErrorMessage(error) || {
          title: 'Signup Failed',
          description: 'An unexpected error occurred. Please try again.',
        },
      );
      setIsErrorModalVisible(true);
    }
  }, [isSuccess, navigation, isError, error]);

  const onSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } else {
      let obj = {
        full_name: name,
        email: normalizeEmail(email),
        password: password,
      };
      signUp(obj);
    }
  };

  const isButtonDisabled =
    !isValidFullName(name) ||
    !isValidEmail(email) ||
    !isPasswordValid ||
    !passwordsMatch ||
    isLoading;

  return (
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
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.description}>Let's get you set up!</Text>
        </View>
        <View style={styles.body}>
          <Input
            placeholder="Enter your full name"
            additionalStyles={styles.input}
            label="Full Name"
            variantType="text"
            LeftIcon={Profile}
            isRequired
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            onBlur={() => {
              if (!isValidFullName(name)) {
                setIsFullNameValid(false);
              } else {
                setIsFullNameValid(true);
              }
            }}
            onFocus={() => {
              setIsFullNameValid(true);
            }}
            errorMsg={
              isFullNameValid
                ? ''
                : 'Please enter a valid full name of at least 2 characters.'
            }
          />
          <Input
            placeholder="Enter your email"
            additionalStyles={styles.input}
            label="Email"
            variantType="text"
            isRequired
            LeftIcon={Mail}
            value={email}
            onChangeText={setEmail}
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
            errorMsg={isEmailValid ? '' : 'Please enter a valid email address.'}
          />
          <Input
            placeholder="Create a password"
            label="Password"
            additionalStyles={styles.input}
            LeftIcon={Lock}
            secureTextEntry
            isRequired
            showPasswordToggle={showPassword}
            setShowPassword={setShowPassword}
            variantType="text"
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirm your password"
            label="Confirm Password"
            additionalStyles={styles.input}
            LeftIcon={Lock}
            secureTextEntry
            isRequired
            showPasswordToggle={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            variantType="text"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <PasswordRules
            passwordChecks={passwordChecks}
            passwordsMatch={passwordsMatch}
            showMatchRule={confirmPassword.length > 0}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              title="Continue"
              variantType="primary"
              onPress={() => onSignUp()}
              additionalStyles={styles.loginButton}
              textStyles={styles.loginButtonText}
              isLoading={isLoading}
              isDisabled={isButtonDisabled || isLoading}
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
            onPress={() => onGooglePress()}
            additionalStyles={styles.googleButton}
            textStyles={styles.googleButtonText}
          />
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Login')}
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
  );
};

const styles = StyleSheet.create({
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

export default SignUp;
