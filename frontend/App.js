import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { ThemeProvider } from './src/constants/theme';

const App = () => (
  <ThemeProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HomeScreen />
    </SafeAreaView>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B172A',
  },
});

export default App;
