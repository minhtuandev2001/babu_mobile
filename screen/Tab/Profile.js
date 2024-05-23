import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Animated, TouchableOpacity, Easing, ScrollView, Modal, TextInput, RefreshControl, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { useState } from 'react';
import ItemPostBasic from '../../components/Item/ItemPostBasic';
import MenuModalProfile from '../../components/menu/MenuModalProfile';
import { DataState } from '../../context/DataProvider';
import { handleUploadOne, openImagePickerAsync } from '../../config/Upload';
import axios from 'axios';
import { useEffect } from 'react';
import CardPosts from '../../components/card/CardPosts';
import { URL } from '../../config/enviroment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const url = URL

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { params } = route;
  const IdUser = params?.params?._id ? params.params._id : null

  const { user, handleFetch } = DataState()
  const widthValue = useRef(new Animated.Value(0)).current;
  const [showDetail, setShowDetail] = useState(false)
  const [showModalUpdatePass, setShowModalUpdatePass] = useState(false)
  const [showModalChange, setShowModalChange] = useState(false)
  const [showModalAvatar, setShowModalAvatar] = useState(false)

  const [chooseAvatar, setChooseAvatar] = useState()
  const [loadingChoose, setLoadingChoose] = useState(false)

  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [errorUpdateInfor, setErrorUpdateInfor] = useState({
    newName: '',
    newLocation: '',
    newDescription: '',
  })
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const [listPostProfile, setListPostProfile] = useState([])
  const [listPostProfileUploads, setListPostProfileUploads] = useState([])
  const [loadingPostProfile, setLoadingPostProfile] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const [profileOther, setProfileOther] = useState()

  const [newFeed, setNewFeed] = useState([])

  const handleLogout = () => {
    navigation.navigate('Login', {});
  }

  const fetchPostsProfile = async () => {
    setLoadingPostProfile(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/posts/${IdUser !== null ? IdUser : user._id}`, config);
      setListPostProfile(data);
      setListPostProfileUploads(data.reverse().slice(0, 4));
      setLoadingPostProfile(false)
      setRefreshing(false)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
      setLoadingPostProfile(false)
    }
  }
  const fetchNewsFeedProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/newFeed/${IdUser !== null ? IdUser : user._id}`, config);
      setNewFeed(data.reverse().slice(0, 4));
      setRefreshing(false)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  const getUserById = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/user/profile/${IdUser}`, config)
      setProfileOther(data)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  useEffect(() => {
    getUserById()
    fetchPostsProfile()
    fetchNewsFeedProfile()
  }, [])
  const handleShowModalAvatar = () => {
    if (showModalAvatar) {
      setChooseAvatar(null)
    }
    setShowModalAvatar(!showModalAvatar)
  }
  const handleShowModalUpdatePass = () => {
    setShowModalUpdatePass(!showModalUpdatePass)
  }
  const handleshowModalChange = () => {
    setShowModalChange(!showModalChange)
  }
  const handleShowDetailOn = () => {
    setShowModalUpdatePass(false)
    Animated.timing(widthValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 150,
      easing: Easing.ease,
      delay: 0,
    }).start();
    setShowDetail(!showDetail)
  }
  const handleShowDetailOff = () => {
    setShowModalUpdatePass(false)
    Animated.timing(widthValue, {
      toValue: 0,
      useNativeDriver: false,
      duration: 150,
      easing: Easing.ease,
      delay: 0,
    }).start();
    setShowDetail(!showDetail)
  }
  const handleChoseAvatar = async () => {
    setLoadingChoose(true)
    let image = await openImagePickerAsync()
    handleUploadOne(image, setChooseAvatar, setLoadingChoose)
  }
  const handleUpdateAvatar = async () => {
    if (!chooseAvatar) {
      return
    }
    setLoadingChoose(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put(`${url}/api/user/reavatar`,
        { userId: user._id, image: chooseAvatar }, config)
      const jsonValue = JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: chooseAvatar,
        token: user.token
      });
      await AsyncStorage.setItem('userInfo', jsonValue);
      handleFetch()
      setLoadingChoose(false)
    } catch (error) {
      setLoadingChoose(false)
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  const handleUpdateInfor = async () => {
    setLoadingUpdate(true)
    let check = true;
    if (newName === '' || newLocation === '' || newDescription === '') {
      check = false
      setErrorUpdateInfor(error => ({
        newName: '',
        newLocation: '',
        newDescription: ''
      }))
    }
    if (newName === '') {
      setErrorUpdateInfor(errorUpdateInfor => ({
        ...errorUpdateInfor, newName: '* This field cannot be left blank'
      }))
    }
    if (newLocation === '') {
      setErrorUpdateInfor(errorUpdateInfor => ({
        ...errorUpdateInfor, newLocation: '* This field cannot be left blank'
      }))
    }
    if (newDescription === '') {
      setErrorUpdateInfor(errorUpdateInfor => ({
        ...errorUpdateInfor, newDescription: '* This field cannot be left blank'
      }))
    }
    if (!check) { // có trường rỗng
      setLoadingUpdate(false)
      return
    } else {
      setErrorUpdateInfor(error => ({
        newName: '',
        newLocation: '',
        newDescription: ''
      }))
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        let dataExem = {
          userId: user._id,
          name: newName,
          description: newDescription,
          location: newLocation
        }
        const { data } = await axios.put(`${url}/api/user/updateInfor`, dataExem, config)
        const jsonValue = JSON.stringify({
          _id: user._id,
          name: data.name,
          email: data.email,
          pic: data.pic,
          token: user.token,
          description: newDescription,
          location: newLocation
        });
        await AsyncStorage.setItem('userInfo', jsonValue);
        handleFetch()
        setLoadingUpdate(false)
      } catch (error) {
        setLoadingUpdate(false)
        // Alert.alert("Error", error.message, [
        //   { text: "OK" }
        // ])
        console.log(error.message)
      }
    }
  }
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={() => { setRefreshing(true), fetchPostsProfile(), fetchNewsFeedProfile() }}
          />
        }
      >
        <View>
          <View style={{
            height: windowHeight / 3.5,
          }}
            className='relative w-full'
          >
            <Image className='w-full h-full'
              source={{ uri: IdUser !== null ? profileOther?.pic : user?.pic }}></Image>
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.05)']}
              locations={[0.000000001, 0.4]}
              className='absolute top-0 w-full h-full'
            ></LinearGradient>
          </View>
          {IdUser !== null &&
            <TouchableOpacity onPress={() => navigation.goBack()}
              className='absolute flex items-center justify-center w-8 h-8 bg-white rounded-full top-4 left-4'>
              <Icon name='chevron-left' type='octicon' color='#FF6838' size={18} />
            </TouchableOpacity>}
          {IdUser ? null :
            <TouchableOpacity onPress={handleShowModalUpdatePass}
              className='absolute flex items-center justify-center rotate-90 top-4 right-4'>
              <Icon name='kebab-horizontal' type='octicon' color='white' size={18} />
            </TouchableOpacity>}
          <TouchableOpacity
            onPress={handleShowModalAvatar}
            activeOpacity={1}
            className='absolute -bottom-[42.5px] left-[25px] w-[85px] h-[85px] rounded-full overflow-hidden border-4 border-white'>
            <Image className='w-full h-full'
              source={{ uri: IdUser !== null ? profileOther?.pic : user?.pic }}></Image>
          </TouchableOpacity>
        </View>
        <View className='mt-12 px-[25px]'>
          <Text className='mb-2 text-xl font-medium'>{IdUser !== null ? profileOther?.name : user?.name}</Text>
          <Text className='mb-2 text-black/70' style={{ width: windowWidth / 1.5 }}>{IdUser !== null ? profileOther?.description ? profileOther?.description : 'write a line status' : user?.description ? user.description : 'write a line status'}</Text>
        </View>
        <View className='flex flex-row justify-between items-center px-[25px] mb-2'>
          <Text className='text-base font-medium text-black/70'>Detail</Text>
          {IdUser !== null ? null
            :
            <TouchableOpacity onPress={handleshowModalChange}>
              <Ionicons name='ios-create-outline' size={20} color='black' />
            </TouchableOpacity>}
        </View>
        <Animated.View className='px-[25px] overflow-hidden'
          style={{
            height: widthValue.interpolate(
              {
                inputRange: [0, 0.2, 0.5, 0.8, 1],
                outputRange: [0, 30, 60, 90, 120],
                extrapolate: "clamp",
              }
            )
          }}
        >
          <View className='flex flex-row items-center justify-start mb-2 gap-x-2'>
            <Ionicons name='md-male-female' size={20} color='#808080' />
            <Text className='font-medium text-black/50'>Gender</Text>
            <Text>Male</Text>
          </View>
          <View className='flex flex-row items-center justify-start mb-2 gap-x-2'>
            <Ionicons name='gift-outline' size={20} color='#808080' />
            <Text className='font-medium text-black/50'>Day or Birth</Text>
            <Text>06-11-2001</Text>
          </View>
          <View className='flex flex-row items-center justify-start mb-2 gap-x-2'>
            <Ionicons name='mail-outline' size={20} color='#808080' />
            <Text className='font-medium text-black/50'>Email</Text>
            <Text>{IdUser !== null ? profileOther?.email : user.email}</Text>
          </View>
          <View className='flex flex-row items-center justify-start mb-1 gap-x-2'>
            <Ionicons name='location-outline' size={24} color='#808080' />
            <Text className='font-medium text-black/50'>Location</Text>
            <Text>470 tran dai nghia</Text>
          </View>
        </Animated.View>
        {!showDetail ?
          <TouchableOpacity onPress={handleShowDetailOn} activeOpacity={0.8}>
            <View className='px-[25px] flex justify-center items-center'>
              <Ionicons name='chevron-up' size={24} color='black' />
            </View>
          </TouchableOpacity>
          : <TouchableOpacity onPress={handleShowDetailOff} activeOpacity={0.8}>
            <View className='px-[25px] flex justify-center items-center'>
              <Ionicons name='chevron-down' size={24} color='black' />
            </View>
          </TouchableOpacity>
        }
        <View className='px-[25px] flex flex-row justify-evenly my-3'>
          <View className='flex items-center'>
            <Text className='mb-1 text-base font-medium text-black/70'>Post</Text>
            <Text className='text-center text-black/50'>{listPostProfile?.length}</Text>
          </View>
          <View className='flex items-center'>
            <Text className='mb-1 text-base font-medium text-black/70'>NewsFeed</Text>
            <Text className='text-center text-black/50'>{newFeed?.length}</Text>
          </View>
          <View className='flex items-center'>
            <Text className='mb-1 text-base font-medium text-black/70'>Follow</Text>
            <Text className='text-center text-black/50'>120</Text>
          </View>
        </View>
        <View className='flex flex-row justify-between px-[25px] mb-4'>
          <Text className='text-base font-medium'>Uploads</Text>
          {/* <Icon name='kebab-horizontal' type='octicon' color='black' size={18} /> */}
        </View>
        <View className='flex flex-row flex-wrap justify-between w-full px-[25px] mb-3'>
          {newFeed.length > 0 ?
            newFeed.map((item, index) => <ItemPostBasic key={item._id} newsFeed={item}></ItemPostBasic>
            )
            : <Text className='text-center text-bleck/50'>No Data</Text>
          }
        </View>
        <View className='px-[25px]'>
          <Text className='mb-4 text-base font-medium'>Timeline</Text>
          {listPostProfile.length > 0 ?
            listPostProfile.map((item, index) => <CardPosts post={item} key={item._id} ></CardPosts>)
            : <Text className='text-center text-bleck/50'>No Data</Text>}
        </View>
      </ScrollView>
      <MenuModalProfile showMenu={showModalUpdatePass} handleFunction={handleLogout}></MenuModalProfile>
      {/* // modal change information   */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalChange}
        onRequestClose={handleshowModalChange}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-5 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleshowModalChange}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Change information</Text>
            </View>
          </View>
          {/* // content modal change information*/}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className='px-[20px]'>
              <Text className='mb-2 text-base font-medium text-black/70'>Name</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  onChangeText={(t) => setNewName(t)}
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter your name...'></TextInput>
              </View>
              <Text className='mb-2 text-xs italic text-red-500'>{errorUpdateInfor.newName}</Text>
              {/* <Text className='mb-2 text-base font-medium text-black/70'>Email</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter your email...'></TextInput>
              </View>
              <Text className='mb-2 text-xs italic text-red-500'>{errorUpdateInfor.newName}</Text> */}
              {/* <Text className='mb-2 text-base font-medium text-black/70'>Day of Birth</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='mb-2 text-xs italic text-red-500'>{errorUpdateInfor.newName}</Text> */}
              <Text className='mb-2 text-base font-medium text-black/70'>Location</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  onChangeText={(t) => setNewLocation(t)}
                  multiline={true}
                  textAlignVertical='top'
                  className='flex-grow min-h-[100px]'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='mb-2 text-xs italic text-red-500'>{errorUpdateInfor.newLocation}</Text>
              <Text className='mb-2 text-base font-medium text-black/70'>Description</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  onChangeText={(t) => setNewDescription(t)}
                  multiline={true}
                  textAlignVertical='top'
                  className='flex-grow min-h-[100px]'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='mb-2 text-xs italic text-red-500'>{errorUpdateInfor.newDescription}</Text>
              <View className='flex flex-row items-center justify-between my-3'>
                <TouchableOpacity onPress={handleshowModalChange}>
                  <Text className='px-6 py-2 text-white rounded-lg bg-violetcustom2'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={loadingUpdate} onPress={handleUpdateInfor} activeOpacity={0.8}>
                  <Text className={`py-2 px-6 rounded-lg  ${loadingUpdate ? 'bg-orangecustom/50' : 'bg-orangecustom'} text-white`}>{loadingUpdate ? 'loading..' : 'Confirm'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* // change image */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModalAvatar}
        onRequestClose={handleShowModalAvatar}>
        <TouchableOpacity activeOpacity={1}
          onPress={handleShowModalAvatar}
          className='w-full h-full bg-black/30'>
          <View className='w-full p-4 mt-auto bg-white rounded-t-lg' style={[{ height: windowHeight / 2 }, styles.shadowPropMenu]}>
            <View className='w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mt-5'>
              <Image className='w-full h-full'
                source={{ uri: chooseAvatar ? chooseAvatar : user?.pic }}></Image>
            </View>
            <Text className='mt-4 font-medium text-center text-black/70'>{loadingChoose ? 'loading..' : 'Choose a new avatar'}</Text>
            <TouchableOpacity onPress={handleChoseAvatar}>
              <View className='w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mt-5 border-dotted border-2 border-orangecustom/50 flex justify-center items-center'>
                <Icon name='plus' type='octicon' color='#FF6838' size={25} />
              </View>
            </TouchableOpacity>
            <View className='flex flex-row items-center gap-4 mt-auto mb-3 justify-evenly'>
              <TouchableOpacity onPress={handleShowModalAvatar}>
                <Text className='px-6 py-2 text-white rounded-lg bg-violetcustom2'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={loadingChoose} onPress={handleUpdateAvatar}>
                <Text className={`py-2 px-6 rounded-lg text-white ${loadingChoose ? 'bg-orangecustom/50' : 'bg-orangecustom'}`}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  shadowPropMenu: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 5,
        backgroundColor: '#FFFFFF',
        // borderRadius: 50,
      },
      default: {}
    })
  }
})

export default Profile;