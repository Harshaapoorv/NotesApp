import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import NotesIcon from '../../assets/Notes.svg';

import Button from '../../components/Button.js';

import Google from '../../assets/icons/Google.jsx';

import BackgroundDecorations from '../../components/BackgroundDecorations.jsx';

import { useNavigation } from '@react-navigation/native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { useGoogleAuthMutation } from '../../services/authApi.js';

import { setCredentials } from '../../redux/slices/authSlice.js';

import { saveRefreshToken } from '../../shared/auth/authStorage.js';

import { useDispatch } from 'react-redux';

import ErrorModal from '../../components/ErrorModal.js';

const LaunchScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [googleAuthApi] = useGoogleAuthMutation();

  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const onCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setErrorMessage('');
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const onGooglePress = async () => {
    if (googleLoading) {
      return;
    }

    try {
      setGoogleLoading(true);

      setIsErrorModalVisible(false);

      setErrorMessage('');

      await GoogleSignin.hasPlayServices();

      // =====================================
      // REUSE EXISTING SESSION IF AVAILABLE
      // =====================================

      let userInfo;

      const currentUser = GoogleSignin.getCurrentUser();

      if (currentUser?.data?.idToken) {
        userInfo = currentUser;
      } else {
        // Opens account picker
        userInfo = await GoogleSignin.signIn();
      }

      const idToken = userInfo?.data?.idToken;

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

      setIsErrorModalVisible(true);

      if (error.code === statusCodes.IN_PROGRESS) {
        setErrorMessage({
          title: 'Sign-In In Progress',

          description:
            'Google sign in is already in progress. Please wait a moment.',
        });

        return;
      }

      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorMessage({
          title: 'Google Services Unavailable',

          description:
            'Google Play Services is unavailable or outdated on this device.',
        });

        return;
      }

      if (error?.status === 'FETCH_ERROR') {
        setErrorMessage({
          title: 'Connection Failed',

          description:
            'Unable to connect to the server. Please check your internet connection and try again.',
        });

        return;
      }

      if (error?.data?.detail) {
        setErrorMessage({
          title: 'Authentication Failed',

          description:
            error?.data?.detail ||
            'Unable to authenticate your Google account.',
        });

        return;
      }

      if (error?.message === 'Google token not found') {
        setErrorMessage({
          title: 'Google Sign In Failed',

          description:
            'Unable to retrieve Google authentication token. Please try again.',
        });

        return;
      }

      setErrorMessage({
        title: 'Something Went Wrong',

        description: 'Google sign in failed unexpectedly. Please try again.',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <BackgroundDecorations />

      <View style={styles.header}>
        <NotesIcon width={120} height={120} />

        <Text style={styles.title}>
          Notes
          <Text style={styles.titleDesc}>App</Text>
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
            isDisabled={googleLoading}
          />

          <Button
            title="Log In"
            variantType="secondary"
            onPress={() => navigation.navigate('Login')}
            additionalStyles={styles.loginButton}
            textStyles={styles.loginButtonText}
            isDisabled={googleLoading}
          />
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.line} />
        </View>

        <Button
          title={googleLoading ? 'Signing in...' : 'Continue with Google'}
          variantType="secondary"
          LeftIcon={googleLoading ? null : Google}
          onPress={onGooglePress}
          additionalStyles={styles.googleButton}
          textStyles={styles.googleButtonText}
          isLoading={googleLoading}
          loaderColor="#2563EB"
        />

        <ErrorModal
          isErrorModalVisible={isErrorModalVisible}
          setIsErrorModalVisible={setIsErrorModalVisible}
          title={errorMessage?.title}
          description={errorMessage?.description}
          onClose={onCloseErrorModal}
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

  errorContainer: {
    marginTop: -8,
    alignItems: 'center',
  },

  errorText: {
    fontSize: 13,
    color: '#B42318',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LaunchScreen;
