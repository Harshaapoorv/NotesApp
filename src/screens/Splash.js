import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NotesIcon from '../assets/Notes.svg';

const Splash = () => {
  const styles = getStyles();
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(1.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('Home');
      }, 300);
    });
  }, []);

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
          Notes<Text style={styles.titleDesc}>App</Text>
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
