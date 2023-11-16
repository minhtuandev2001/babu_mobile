import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Container from '../components/layouts/Container';

const Splash = ({ navigation }) => {
  useEffect(() => {
    var clearTime = setTimeout(() => {
      navigation.navigate('Login', {});
    }, 3000);
    return () => {
      clearTimeout(clearTime)
    };
  }, []);
  return (
    <Container>
      <View className='flex justify-center items-center h-full'>
        <View>
          <Text className='text-3xl font-bold text-orangecustom shadow-md mb-10'>BABU NETWORK</Text>
          <ActivityIndicator size='large' color='#FF6838'></ActivityIndicator>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  shadowText: {
    textShadowColor: '#FF6838',
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 20
  }

})

export default Splash;
