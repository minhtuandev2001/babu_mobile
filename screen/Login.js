import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions, BackHandler } from 'react-native';
import tw from 'twrnc'
import Container from '../components/layouts/Container';
// icon
import iconMail from '../assets/icon/mail.png'
import lock from '../assets/icon/lock.png'
import eyeOff from '../assets/icon/eye-off.png'
import back from '../assets/icon/back.png'
import google from '../assets/icon/google.png'
import facebook from '../assets/icon/facebook.png'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      return true
    }
    const backhandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      backhandler.remove()
    };
  }, []);
  const handleSwitch = () => { }
  const switchRegister = () => {
    navigation.navigate('Register', {});
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className=' transition-all'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View className='flex justify-between' style={{ height: windowHeight }}>
            <View className='px-[25px] flex-grow'>
              <Text className='text-[32px] font-bold w-[200px] mt-[20%]'>Login Your Account</Text>
              <View className='mt-[20%]'>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden'>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={iconMail}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your email'></TextInput>
                </View>
                <Text className='mb-4 text-xs text-red-500 italic mt-1'>error messages</Text>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden'>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={lock}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your email'></TextInput>
                  <Image
                    className='w-4 h-4'
                    source={eyeOff}></Image>
                </View>
                <Text className='mb-4 text-xs text-red-500 italic mt-1'>error messages</Text>
                <View className='flex flex-row justify-between items-center mb-10'>
                  <View className='flex justify-center items-center gap-x-5 flex-row'>
                    <View className='w-[60px] h-7 bg-orangecustom rounded-full flex justify-center p-[2px]'>
                      <View className='bg-white rounded-full w-[25px] h-[25px]'></View>
                    </View>
                    <Text className='text-black/70'>Save me</Text>
                  </View>
                  <Text className='text-black/70'>Forgot Password ?</Text>
                </View>
                <TouchableOpacity>
                  <View className='h-[50px] bg-orangecustom rounded-lg flex items-center justify-center'>
                    <Text className='text-center text-base text-white font-semibold'>Login</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={switchRegister}>
                  <View className='flex flex-row gap-x-4 mx-auto mt-4'>
                    <Text className='text-sm text-black/50 font-semibold'>Create New Account?</Text>
                    <Text className='text-violetcustom font-semibold'>Sign up</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className='w-full h-[145px] self-start border-[0.5px] border-graycustom/70 '>
              <Text className='text-sm text-black/50 font-semibold text-center mt-[10px]'>Continue With Account</Text>
              <View className='flex flex-row justify-center h-full mt-7 gap-x-[25px]'>
                <View className='w-full max-w-[136px] max-h-[46px] bg-graycustom/40 flex justify-center items-center rounded-lg'>
                  <Image source={google}></Image>
                </View>
                <View className='w-full max-w-[136px]  max-h-[46px] bg-graycustom/40 flex justify-center items-center rounded-lg'>
                  <Image source={facebook}></Image>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
const styles = StyleSheet.create({
  shadowProp: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  }
})

export default Login;
