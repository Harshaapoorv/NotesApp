import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Button from '../../components/Button';

import Disconnected from '../../assets/icons/Disconnected';

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Disconnected width={220} height={120} />

            <View style={styles.textContainer}>
              <Text style={styles.title}>No Internet Connection</Text>

              <Text style={styles.description}>
                Your device is currently offline. Please check your Wi-Fi or
                mobile data connection and try again.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 56,
  },

  header: {
    alignItems: 'center',
  },

  textContainer: {
    marginTop: 28,
    alignItems: 'center',
    gap: 14,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default NoInternet;
