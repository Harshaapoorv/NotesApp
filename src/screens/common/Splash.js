import React, { useEffect, useRef } from 'react';

import { Animated, StyleSheet, View, Text, Easing } from 'react-native';

import { useDispatch } from 'react-redux';

import NotesIcon from '../../assets/Notes.svg';

import {
  setCredentials,
  setAppReady,
  logout,
} from '../../redux/slices/authSlice.js';

import {
  getRefreshToken,
  saveRefreshToken,
  clearRefreshToken,
} from '../../shared/auth/authStorage.js';
import { useRefreshTokenMutation } from '../../services/authApi.js';
import { notesApi } from '../../services/notesApi.js';
import { authApi } from '../../services/authApi.js';

const Splash = () => {
  const styles = getStyles();

  const dispatch = useDispatch();

  const scaleAnim = useRef(new Animated.Value(1.6)).current;

  const opacityAnim = useRef(new Animated.Value(0)).current;

  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (hasBootstrapped.current) {
      return;
    }

    hasBootstrapped.current = true;

    bootstrapApp();
  }, []);

  const [refreshTokenApi] = useRefreshTokenMutation();

  const bootstrapApp = async () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        return;
      }

      const response = await refreshTokenApi({
        refresh_token: refreshToken,
      }).unwrap();

      await saveRefreshToken(response.refresh_token);

      dispatch(
        setCredentials({
          accessToken: response.access_token,

          user: response.user,
        }),
      );
    } catch (error) {
      await clearRefreshToken();

      dispatch(logout());

      dispatch(notesApi.util.resetApiState());

      dispatch(authApi.util.resetApiState());
    } finally {
      dispatch(setAppReady(true));
    }
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],

          opacity: opacityAnim,

          alignItems: 'center',
        }}
      >
        <NotesIcon width={120} height={120} />

        <Text style={styles.title}>
          Notes
          <Text style={styles.titleDesc}>App</Text>
        </Text>

        <Text style={styles.description}>Write. Organize. Remember</Text>
      </Animated.View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#111827',
      marginTop: 12,
    },

    titleDesc: {
      fontWeight: '500',
    },

    description: {
      fontSize: 14,
      color: '#667085',
      marginTop: 6,
    },
  });

export default Splash;
