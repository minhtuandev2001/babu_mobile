import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const Container = ({ children }) => {
  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      // showHideTransition={statusBarTransition}
      // hidden={hidden}
      />
      <View>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})

export default Container;
