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

const ItemPostBasic = ({ post }) => {
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
      className='mb-2 overflow-hidden rounded-lg relative'
      style={{ width: windowWidth / 2 - 30, height: 150 }}>
      <Image className='w-full h-full'
        source={{ uri: post?.media[0] }}></Image>
      <View className='absolute bg-black/20 w-full h-full'></View>
      <Text className='absolute bottom-1 left-1 text-white text-base font-medium'>{post.createdAt.split("T")[0]}</Text>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className='relative px-[20px]'>
              <View className='flex flex-row justify-between'>
                <View className='flex flex-row gap-x-[10px]'>
                  <Image
                    className='w-10 h-10 rounded-full'
                    source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
                  <View className=''>
                    <Text className='mr-1 text-base font-medium'>Estefania</Text>
                    <Text className="text-sm font-medium text-black/50">5 min ago</Text>
                  </View>
                </View>
                <TouchableOpacity
                // onPress={() => setShowMenuPostDetail(!showMenuPostDetail)}
                >
                  <View className='flex items-center justify-center rotate-90'>
                    <Icon name='kebab-horizontal' type='octicon' color='#FF6838' size={20} />
                  </View>
                </TouchableOpacity>
              </View>
              <View className='pt-3 mb-3'>
                <Text
                  className='mb-4 text-sm text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestiae nesciunt, unde repudiandae voluptate beatae laborum explicabo praesentium voluptatibus voluptas. Officiis adipisci ex cumque eligendi odit exercitationem recusandae, unde cum sed excepturi accusamus, impedit harum minima vitae, incidunt illo hic dolore? Veniam assumenda nulla quo deleniti aliquid? Id, cum neque?</Text>
                <View
                  style={{ height: windowHeight / 3.5 }}
                  className='bg-red-400 rounded-[10px] overflow-hidden '>
                  <Swiper
                    dot={
                      <View style={{ backgroundColor: '#DCE0DB', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: -10, }} />
                    }
                    activeDot={
                      <View style={{ backgroundColor: '#FF6838', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: -10, }} />
                    }
                  >
                    {data.map((item, index) => <Image
                      className='object-cover object-center h-full'
                      key={index} source={{ uri: item.image }} />)}
                  </Swiper>
                </View>
                <View className='flex flex-row justify-between mt-3'>
                  <View className='flex flex-row  w-[50px] justify-between gap-x-4'>
                    <TouchableOpacity onPress={() => handleFavouritePosts()}>
                      {buttonHeart ?
                        <Icon name='heart-fill' type='octicon' color='#FF6464' size={20} />
                        : <Icon name='heart' type='octicon' color='#FF6838' size={20} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon name='comment' type='octicon' color='#FF6838' size={20} />
                    </TouchableOpacity>
                  </View>
                  <Icon name='share-android' type='octicon' color='#FF6838' size={20} />
                </View>
              </View>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              {/* /////////////////////////////// MENU */}
              <MenuModalPosts showMenu={showMenuPostDetail}></MenuModalPosts>
            </View>
            <View className='w-full h-[80px]'></View>
          </ScrollView>
          <View className='absolute bottom-0 w-full bg-white p-[20px]'>
            <View className='flex flex-row w-full '>
              <TextInput
                className='flex-grow pl-3 mr-3 rounded-lg bg-graycustom/30'
                placeholderTextColor='#CFCFCF'
                placeholder='comment...'></TextInput>
              <TouchableOpacity activeOpacity={0.7}>
                <View className='flex items-center justify-center w-8 h-8 rounded-full bg-orangecustom'>
                  <Icon name='plus' type='octicon' color='white' size={20} />
                </View>
              </TouchableOpacity>
            </View>
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
