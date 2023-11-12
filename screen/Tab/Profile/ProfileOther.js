import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Animated, TouchableOpacity, Easing, ScrollView, Modal, TextInput } from 'react-native';
import Container from '../../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { useState } from 'react';
import ItemPostBasic from '../../../components/Item/ItemPostBasic';
import MenuModalProfile from '../../../components/menu/MenuModalProfile';
import CardPostsForProfile from '../../../components/card/CardPostForProfile';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ProfileOther = () => {
  const widthValue = useRef(new Animated.Value(0)).current;
  const [showDetail, setShowDetail] = useState(false)
  const [showModalProfile, setShowModalProfile] = useState(false)
  const [showModalChange, setShowModalChange] = useState(false)
  const [showModalAvatar, setShowModalAvatar] = useState(false)
  const handleShowModalAvatar = () => {
    setShowModalAvatar(!showModalAvatar)
  }
  const handleShowModalProfile = () => {
    setShowModalProfile(!showModalProfile)
  }
  const handleshowModalChange = () => {
    setShowModalChange(!showModalChange)
  }
  const handleShowDetailOn = () => {
    setShowModalProfile(false)
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
    setShowModalProfile(false)
    Animated.timing(widthValue, {
      toValue: 0,
      useNativeDriver: false,
      duration: 150,
      easing: Easing.ease,
      delay: 0,
    }).start();
    setShowDetail(!showDetail)
  }
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View style={{
            height: windowHeight / 3.5,
          }}
            className='w-full relative'
          >
            <Image className='w-full h-full'
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
          </View>
          <TouchableOpacity onPress={handleShowModalProfile}
            className='flex items-center justify-center rotate-90 absolute top-4 right-4'>
            <Icon name='kebab-horizontal' type='octicon' color='white' size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShowModalAvatar}
            activeOpacity={1}
            className='absolute -bottom-[42.5px] left-[25px] w-[85px] h-[85px] rounded-full overflow-hidden border-4 border-white'>
            <Image className='w-full h-full'
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
          </TouchableOpacity>
        </View>
        <View className='mt-12 px-[25px]'>
          <Text className='text-xl font-medium mb-2'>Joaquin</Text>
          <Text className='text-black/70 mb-2' style={{ width: windowWidth / 1.5 }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, tenetur.</Text>
        </View>
        <View className='flex flex-row justify-between items-center px-[25px] mb-2'>
          <Text className='text-base font-medium text-black/70'>Detail</Text>
          <TouchableOpacity onPress={handleshowModalChange}>
            <Ionicons name='ios-create-outline' size={20} color='black' />
          </TouchableOpacity>
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
          <View className='flex flex-row gap-x-2 mb-2  items-center justify-start'>
            <Ionicons name='md-male-female' size={20} color='#808080' />
            <Text className='text-black/50 font-medium'>Gender</Text>
            <Text>Male</Text>
          </View>
          <View className='flex flex-row gap-x-2 mb-2  items-center justify-start'>
            <Ionicons name='gift-outline' size={20} color='#808080' />
            <Text className='text-black/50 font-medium'>Day or Birth</Text>
            <Text>06-11-2001</Text>
          </View>
          <View className='flex flex-row gap-x-2 mb-2  items-center justify-start'>
            <Ionicons name='mail-outline' size={20} color='#808080' />
            <Text className='text-black/50 font-medium'>Email</Text>
            <Text>tuan@gmail.com</Text>
          </View>
          <View className='flex flex-row gap-x-2 mb-1  items-center justify-start'>
            <Ionicons name='location-outline' size={24} color='#808080' />
            <Text className='text-black/50 font-medium'>Location</Text>
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
            <Text className='text-black/70 font-medium text-base mb-1'>Post</Text>
            <Text className='text-black/50 text-center'>120</Text>
          </View>
          <View className='flex items-center'>
            <Text className='text-black/70 font-medium text-base mb-1'>Friends</Text>
            <Text className='text-black/50 text-center'>120</Text>
          </View>
          <View className='flex items-center'>
            <Text className='text-black/70 font-medium text-base mb-1'>Follow</Text>
            <Text className='text-black/50 text-center'>120</Text>
          </View>
        </View>
        <View className='flex flex-row justify-between px-[25px] mb-4'>
          <Text className='text-base font-medium'>Uplads</Text>
          <Icon name='kebab-horizontal' type='octicon' color='black' size={18} />
        </View>
        <View className='flex flex-row flex-wrap justify-between w-full px-[25px] mb-3'>
          <ItemPostBasic></ItemPostBasic>
          <ItemPostBasic></ItemPostBasic>
          <ItemPostBasic></ItemPostBasic>
          <ItemPostBasic></ItemPostBasic>
        </View>
        <View className='px-[25px]'>
          <Text className='text-base font-medium mb-4'>Timeline</Text>
          <CardPostsForProfile></CardPostsForProfile>
          <CardPostsForProfile></CardPostsForProfile>
          <CardPostsForProfile></CardPostsForProfile>
          <CardPostsForProfile></CardPostsForProfile>
        </View>
      </ScrollView>
      <MenuModalProfile showMenu={showModalProfile}></MenuModalProfile>
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
              <Text className='text-black/70 font-medium text-base mb-2'>Name</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter your name...'></TextInput>
              </View>
              <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
              <Text className='text-black/70 font-medium text-base mb-2'>Email</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter your email...'></TextInput>
              </View>
              <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
              <Text className='text-black/70 font-medium text-base mb-2'>Day of Birth</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
              <Text className='text-black/70 font-medium text-base mb-2'>Location</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  multiline={true}
                  textAlignVertical='top'
                  className='flex-grow min-h-[100px]'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
              <Text className='text-black/70 font-medium text-base mb-2'>Description</Text>
              <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
                <TextInput
                  multiline={true}
                  textAlignVertical='top'
                  className='flex-grow min-h-[100px]'
                  placeholderTextColor='#CFCFCF'
                  placeholder='Enter old password...'></TextInput>
              </View>
              <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
              <View className='flex flex-row justify-between items-center my-3'>
                <TouchableOpacity onPress={handleshowModalChange}>
                  <Text className='py-2 px-6 rounded-lg bg-violetcustom2 text-white'>Cancel</Text>
                </TouchableOpacity>
                <Text className='py-2 px-6 rounded-lg bg-orangecustom text-white'>Confirm</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModalAvatar}
        onRequestClose={handleShowModalAvatar}>
        <TouchableOpacity activeOpacity={1}
          onPress={handleShowModalAvatar}
          className='w-full h-full bg-black/30'>
          <View className='w-full  rounded-t-lg bg-white mt-auto p-4' style={[{ height: windowHeight / 2 }, styles.shadowPropMenu]}>
            <View className='w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mt-5'>
              <Image className='w-full h-full'
                source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
            </View>
            <Text className='text-black/70 font-medium mt-4 text-center'>Choose a new avatar</Text>
            <View className='w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mt-5 border-dotted border-2 border-orangecustom/50 flex justify-center items-center'>
              <Icon name='plus' type='octicon' color='#FF6838' size={25} />
            </View>
            <View className='flex flex-row justify-evenly gap-4 items-center mb-3 mt-auto'>
              <TouchableOpacity onPress={handleShowModalAvatar}>
                <Text className='py-2 px-6 rounded-lg bg-violetcustom2 text-white'>Cancel</Text>
              </TouchableOpacity>
              <Text className='py-2 px-6 rounded-lg bg-orangecustom text-white'>Confirm</Text>
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

export default ProfileOther;