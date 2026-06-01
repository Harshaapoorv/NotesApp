import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './src/stacks/RootNavigator';
import store from './src/redux/store';
import './src/config/googleSignin';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
