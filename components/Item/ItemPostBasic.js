import { Icon } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import Comment from '../comment/Comment';
import MenuModalPosts from '../menu/MenuModalPosts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1682687220777-2c60708d6889?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    image: 'https://plus.unsplash.com/premium_photo-1699384428169-2b8a11e2ed77?q=80&w=1519&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    image: 'https://plus.unsplash.com/premium_photo-1674420732043-d00b956e00b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1682688759350-050208b1211c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

const ItemPostBasic = (props) => {
  const { newsFeed } = props
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [buttonHeart, setButtonHeart] = useState(false)
  const [showMenuPostDetail, setShowMenuPostDetail] = useState(false)
  const handleFavouritePosts = () => {
    setButtonHeart(!buttonHeart)
  }
  const handleShowModalDetail = () => {
    setShowModalDetail(!showModalDetail)
  }
  return (
    <TouchableOpacity onPress={handleShowModalDetail}
      className='relative mb-2 overflow-hidden rounded-lg'
      style={{ width: windowWidth / 2 - 30, height: 150 }}>
      <Image className='w-full h-full'
        source={{ uri: newsFeed?.media }}></Image>
      <View className='absolute w-full h-full bg-black/20'></View>
      <Text className='absolute text-base font-medium text-white bottom-1 left-1'>{newsFeed.createdAt.split("T")[0]}</Text>
      {/* // menu posts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalDetail}
        onRequestClose={handleShowModalDetail}>
        <View className='w-full h-full pt-1 bg-white'>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.shadowPropMenu}
            className='flex items-center justify-center w-8 h-8 bg-white rounded-full mb-5 ml-[20px]'
            onPress={handleShowModalDetail}>
            <Icon
              name='chevron-left'
              type='octicon'
              color='#FF6838'
              size={14}
            />
          </TouchableOpacity>
          {/* // content modal posts detail   */}
          <View className='px-[20px]'>
            <Image
              style={{ height: windowHeight - 100 }}
              className='w-full'
              source={{ uri: newsFeed?.media }}></Image>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
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
        borderRadius: 50,
      },
      default: {}
    })
  }

})

export default ItemPostBasic;
