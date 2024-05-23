import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/layouts/Container';

const Splash = () => {
  const navigation = useNavigation();
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
      <View className='flex items-center justify-center h-full'>
        <View>
          <Text className='mb-10 text-3xl font-bold shadow-md text-orangecustom'>BABU NETWORK</Text>
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
