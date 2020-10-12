import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Hangman from './Hangman';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Hangman />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
