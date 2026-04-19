import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './src/screens/Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
