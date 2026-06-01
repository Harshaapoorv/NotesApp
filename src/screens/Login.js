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
import { useLoginMutation } from '../services/authApi.js';
import ErrorModal from '../components/ErrorModal.js';
import getErrorMessage from '../services/apiErrorHandler.js';
import { saveRefreshToken } from '../shared/auth/authStorage.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { useGoogleAuthMutation } from '../services/authApi';

import {
  isValidPassword,
  isValidEmail,
  normalizeEmail,
} from '../shared/validators/validators';

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const isPasswordValid = isValidPassword(password);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isButtonDisabled =
    !isValidEmail(email) || !isPasswordValid || isLoading;

  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();
  const dispatch = useDispatch();

  const onLogin = () => {
    login({ email: normalizeEmail(email), password });
  };

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  useEffect(() => {
    if (isSuccess) {
      saveRefreshToken(data?.refresh_token);
      dispatch(
        setCredentials({
          accessToken: data?.access_token,
          user: data?.user,
        }),
      );
    } else if (isError) {
      setErrorMessage(
        getErrorMessage(error) || {
          title: 'Login Failed',
          description: 'An unexpected error occurred. Please try again.',
        },
      );
      setIsErrorModalVisible(true);
    }
  }, [isSuccess, navigation, isError, error]);

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
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.description}>Glad to see you again!</Text>
        </View>
        <View style={styles.body}>
          <Input
            placeholder="Email"
            additionalStyles={styles.input}
            label="Email"
            variantType="text"
            LeftIcon={Mail}
            value={email}
            onChangeText={setEmail}
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
            errorMsg={isEmailValid ? '' : 'Please enter a valid email address.'}
          />
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Password"
              label="Password"
              additionalStyles={styles.input}
              LeftIcon={Lock}
              secureTextEntry
              showPasswordToggle={showPassword}
              setShowPassword={setShowPassword}
              variantType="text"
              value={password}
              isRequired
              onChangeText={setPassword}
            />
            <Text
              style={styles.forgotPasswordText}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Forgot your password?
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonsContainer}>
            <Button
              title="Log In"
              variantType="primary"
              onPress={() => onLogin()}
              additionalStyles={styles.loginButton}
              textStyles={styles.loginButtonText}
              isLoading={isLoading}
              isDisabled={isButtonDisabled}
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
            Don't have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </Text>
          </Text>
          <ErrorModal
            isErrorModalVisible={isErrorModalVisible}
            setIsErrorModalVisible={setIsErrorModalVisible}
            title={errorMessage?.title}
            description={errorMessage?.description}
            onClose={onCloseErrorModal}
          />
        </View>
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
    marginTop: 80,
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

export default Login;
