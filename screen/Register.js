import React from 'react';
import { View, Text, Image, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import tw from 'twrnc'
import Container from '../components/layouts/Container';
// icon
import iconMail from '../assets/icon/mail.png'
import userIcon from '../assets/icon/user.png'
import lock from '../assets/icon/lock.png'
import eyeOff from '../assets/icon/eye-off.png'
import back from '../assets/icon/back.png'
import google from '../assets/icon/google.png'
import facebook from '../assets/icon/facebook.png'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Register = ({ navigation }) => {
  const backPageLogin = () => {
    navigation.goBack()
  }
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className=' transition-all'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View className='flex justify-between' style={{ height: windowHeight }}>
            <View className='px-[25px] flex-grow'>
              <TouchableWithoutFeedback onPress={backPageLogin}>
                <View className='w-8 h-8 m-2 ml-0 rounded-lg flex justify-center items-center' style={styles.shadowProp}>
                  <Image
                    className='w-[6px] h-[12px]'
                    source={back}></Image>
                </View>
              </TouchableWithoutFeedback>
              <Text className='text-[32px] font-bold w-[200px] mt-[5%]'>Create Your Account</Text>
              <View className='mt-[10%]'>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden'>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={userIcon}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your username'></TextInput>
                </View>
                <Text className='mt-1 mb-4 text-xs text-red-500 italic'>error messages</Text>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden '>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={iconMail}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your email'></TextInput>
                </View>
                <Text className='mt-1 mb-4 text-xs text-red-500 italic'>error messages</Text>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden '>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={lock}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your password'></TextInput>
                  <Image
                    className='w-4 h-4'
                    source={eyeOff}></Image>
                </View>
                <Text className='mt-1 mb-4 text-xs text-red-500 italic'>error messages</Text>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden '>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={lock}></Image>
                  <TextInput
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your password'></TextInput>
                  <Image
                    className='w-4 h-4'
                    source={eyeOff}></Image>
                </View>
                <Text className='mt-1 mb-4 text-xs text-red-500 italic'>error messages</Text>
                <TouchableOpacity>
                  <View className='h-[50px] bg-orangecustom rounded-lg flex items-center justify-center'>
                    <Text className='text-center text-base text-white font-semibold'>Register</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={backPageLogin}>
                  <View className='flex flex-row gap-x-4 mx-auto mt-4'>
                    <Text className='text-sm text-black/50 font-semibold'>Create New Account?</Text>
                    <Text className='text-violetcustom font-semibold'>Sign in</Text>
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

export default Register;
