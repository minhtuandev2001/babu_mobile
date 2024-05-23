import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions, BackHandler, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../components/layouts/Container';
// icon
import iconMail from '../assets/icon/mail.png'
import lock from '../assets/icon/lock.png'
import eyeOff from '../assets/icon/eye-off.png'
import eyeOn from '../assets/icon/eye-on.png'
import back from '../assets/icon/back.png'
import google from '../assets/icon/google.png'
import facebook from '../assets/icon/facebook.png'
import axios from 'axios';
import { URL } from '../config/enviroment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const url = URL
const Login = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [security, setSecurity] = useState(true)
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
  const handleLogin = async () => {
    setLoading(true)
    let check = true;
    if (email === '' || password === '') {
      check = false
      setError(error => ({
        email: '',
        password: '',
      }))
    }
    if (email === '') {
      setError(error => ({
        ...error, email: '* This field cannot be left blank'
      }))
    }
    if (password === '') {
      setError(error => ({
        ...error, password: '* This field cannot be left blank'
      }))
    }
    if (!check) { // có trường rỗng
      setLoading(false)
      return
    } else {
      setError(error => ({
        email: '',
        password: '',
      }))
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        const { data } = await axios.post(`${url}/api/user/login`,
          { email, password }, config)
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        setLoading(false)
        navigation.navigate('BottomTabNavigation', {});
      } catch (error) {
        setLoading(false)
        // Alert.alert("Error", error.message, [
        //   { text: "OK" }
        // ])
        Alert.alert("Warning", "account or password is incorrect", [
          { text: "Cancel" }
        ])
        console.log(error.message)
      }
    }
  }
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className='transition-all '
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
                    onChangeText={(t) => setEmail(t)}
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your email'></TextInput>
                </View>
                <Text className='mt-1 mb-4 text-xs italic text-red-500'>{error.email}</Text>
                <View className='bg-graycustom/30 flex flex-row py-3 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden'>
                  <Image
                    className='w-6 h-6 mr-7'
                    source={lock}></Image>
                  <TextInput
                    onChangeText={(t) => setPassword(t)}
                    secureTextEntry={security}
                    className='flex-grow'
                    placeholderTextColor='#CFCFCF'
                    placeholder='enter your password'></TextInput>
                  <TouchableOpacity onPress={() => setSecurity(!security)}>
                    {security
                      ? <Image
                        className='w-[15px] h-[13px]'
                        source={eyeOn}></Image>
                      : <Image
                        className='w-4 h-4'
                        source={eyeOff}></Image>}
                  </TouchableOpacity>
                </View>
                <Text className='mt-1 mb-4 text-xs italic text-red-500'>{error.password}</Text>
                <View className='flex flex-row items-center justify-between mb-10'>
                  <View className='flex flex-row items-center justify-center gap-x-5'>
                    <View className='w-[60px] h-7 bg-orangecustom rounded-full flex justify-center p-[2px]'>
                      <View className='bg-white rounded-full w-[25px] h-[25px]'></View>
                    </View>
                    <Text className='text-black/70'>Save me</Text>
                  </View>
                  <Text className='text-black/70'>Forgot Password ?</Text>
                </View>
                <TouchableOpacity onPress={handleLogin}>
                  <View className='h-[50px] bg-orangecustom rounded-lg flex items-center justify-center'>
                    <Text className='text-base font-semibold text-center text-white'>{loading ? 'loading...' : 'Login'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={switchRegister}>
                  <View className='flex flex-row items-center justify-center w-full mx-auto mt-4 gap-x-4'>
                    <Text className='text-sm font-semibold text-black/50'>Create New Account?</Text>
                    <Text className='font-semibold text-violetcustom'>Sign up</Text>
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
