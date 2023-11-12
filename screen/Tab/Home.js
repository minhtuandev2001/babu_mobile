import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, Modal, TouchableOpacity, TextInput } from 'react-native';
import Container from '../../components/layouts/Container';
// icon
import bellIcon from "../../assets/icon/bell.png"

// image
import imageNewsFeed from "../../assets/image/newsFeed.png"
import plusNewsFeed from "../../assets/icon/plusNewsFeed.png"

import CardNewsFeed from '../../components/card/CardNewsFeed';
import { Icon } from '@rneui/themed';
import CardPosts from '../../components/card/CardPosts';
import { useState } from 'react';
import ItemNotification from '../../components/Item/ItemNotification';
import ItemImage from '../../components/Item/ItemImage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = () => {
  const [showModalNotif, setShowModalNotif] = useState(false)
  const [showModalPosting, setShowModalPosting] = useState(false)
  const handleModalNotif = () => {
    setShowModalNotif(!showModalNotif)
  }
  const handleModalPosting = () => {
    setShowModalPosting(!showModalPosting)
  }
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className='w-full h-full bg-white'>
          <View className='flex flex-row justify-between items-center mb-[30px] px-[20px]'>
            <Text className='text-2xl font-bold text-orangecustom'>Babu Network</Text>
            <TouchableOpacity onPress={handleModalNotif}>
              <View>
                <Image
                  className=''
                  source={bellIcon}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className='max-h-[180px] flex-grow-0 flex-shrink-0'
              horizontal={true}
            >
              <TouchableOpacity onPress={handleModalPosting} activeOpacity={1}>
                <View
                  style={styles.shadowPropHome}
                  className='w-[140px] max-h-[160px] bg-white rounded-[10px] py-5 px-[10px] relative m-2'>
                  <Image
                    className='absolute z-10 bottom-4 right-3'
                    source={plusNewsFeed}></Image>
                  <Image
                    className='w-full h-full'
                    source={imageNewsFeed}></Image>
                </View>
              </TouchableOpacity>
              {[1, 2, 3, 4, 5, 6, 0, 7, 8, 'a', 'wr', 'v', 'c', 'x', 'z', ' l'].map(item => <CardNewsFeed key={item}></CardNewsFeed>)}
            </ScrollView>
            <View className='p-[20px]'>
              <TouchableOpacity onPress={handleModalPosting} activeOpacity={1}>
                <View
                  style={[{ height: windowHeight / 5 }, styles.shadowPropHome]}
                  className='p-[14px] rounded-[10px] bg-white mb-[10px]'>
                  <View className='flex flex-row gap-x-[10px]'>
                    <Image
                      className='w-10 h-10 rounded-full'
                      source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
                    <View className='flex flex-row items-start'>
                      <Text className='mr-1 text-base font-medium'>Estefania</Text>
                    </View>
                  </View>
                  <View className='pt-8 pl-12'>
                    <Text className='text-sm text-black/50'>Write what you think....</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <CardPosts></CardPosts>
              <CardPosts></CardPosts>
              <CardPosts></CardPosts>
              <CardPosts></CardPosts>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* // Modal notification  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalNotif}
        onRequestClose={handleModalNotif}>
        <View className='w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center gap-4 mb-4 pl-[20px]'>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.shadowPropMenu}
              className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
              onPress={handleModalNotif}>
              <Icon
                name='chevron-left'
                type='octicon'
                color='#FF6838'
                size={14}
              />
            </TouchableOpacity>
            <Text className='text-base font-medium text-orangecustom'>Notification</Text>
          </View>
          {/* // content modal notification */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
            <ItemNotification></ItemNotification>
          </ScrollView>
        </View>
      </Modal>
      {/* // modal posting  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalPosting}
        onRequestClose={handleModalPosting}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleModalPosting}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Create new posts</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className=' px-4 py-[2px] font-medium text-white rounded-md bg-orangecustom'>Post</Text>
            </TouchableOpacity>
          </View>
          {/* // content modal notification */}
          <ScrollView>
            <View className='px-[20px] flex flex-row flex-wrap w-full'>
              <View className='w-full min-h-[100px] mt-5'>
                <TextInput
                  className='w-full'
                  textAlignVertical='top'
                  multiline={true}
                  placeholder='write what you think...'
                />
              </View>
              <View className='flex flex-row flex-wrap justify-between w-full'>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
                <ItemImage></ItemImage>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity activeOpacity={0.7} className='absolute right-2 bottom-5'>
            <View className='flex items-center justify-center rounded-full w-11 h-11 bg-orangecustom'>
              <Icon name='plus' type='octicon' color='white' size={24} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  shadowPropHome: {
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
        elevation: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  },
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

export default Home;
