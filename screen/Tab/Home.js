import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, Modal, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
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
import { DataState } from '../../context/DataProvider';
import { useEffect } from 'react';
import axios from 'axios';
import { handleUpload2, openImagePickerAsync } from '../../config/Upload';
import { TouchableWithoutFeedback } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const url = process.env.REACT_APP_URL
const Home = ({ navigation }) => {
  const { user } = DataState()
  const [showModalNotif, setShowModalNotif] = useState(false)
  const [showModalPosting, setShowModalPosting] = useState(false)

  const [posts, setPosts] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)

  const [content, setContent] = useState('')
  const [listImage, setListImage] = useState([])
  const [chooseImage, setChooseImage] = useState()
  const [loadingCreate, setLoaingCreate] = useState(false)
  const handleChoseImage = async () => {
    setLoaingCreate(true)
    let image = await openImagePickerAsync()
    console.log(image)
    handleUpload2(image, listImage, setListImage, setLoaingCreate)
  }
  const clearImage = (url) => {
    setListImage(listImage.filter(image => image !== url))
  }
  const handleCreatePosts = async () => {
    setLoaingCreate(true)
    if (content === '') {
      Alert.alert('Wring', 'You are leaving the content blank', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setLoaingCreate(false)
      return
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        console.log('chao')
        const { data } = await axios.post(`${url}/api/posts/`,
          { content, images: listImage }, config)
        handleFetchAgaim()
        Alert.alert('Success', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setLoaingCreate(false)
      } catch (error) {
        setLoaingCreate(false)
        console.log(error.message)
      }
    }
  }

  const handleFetchAgaim = () => {
    setFetchAgain(!fetchAgain)
  }
  const handleModalNotif = () => {
    setShowModalNotif(!showModalNotif)
  }
  const handleModalPosting = () => {
    setShowModalPosting(!showModalPosting)
  }
  const backPageLogin = () => {
    navigation.goBack()
  }
  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.get(`${url}/api/posts/`, config);
      console.log(data)
      setPosts(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [fetchAgain])
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className='w-full h-full bg-white'>
          <View className='flex flex-row justify-between items-center mb-[30px] px-[20px]'>
            <Text className='text-2xl font-bold text-orangecustom'>Babu Network</Text>
            {/* <TouchableOpacity onPress={handleModalNotif}> */}
            {/* <TouchableOpacity onPress={backPageLogin}>
              <View>
                <Image
                  className=''
                  source={bellIcon}></Image>
              </View>
            </TouchableOpacity> */}
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
              {posts.length > 0 && posts.map(item => item?.media?.length > 0 ? <CardNewsFeed key={item._id} post={item}></CardNewsFeed> : null)}
            </ScrollView>
            <View className='p-[20px]'>
              <TouchableOpacity onPress={handleModalPosting} activeOpacity={1}>
                <View
                  style={[{ height: windowHeight / 5 }, styles.shadowPropHome]}
                  className='p-[14px] rounded-[10px] bg-white mb-[10px]'>
                  <View className='flex flex-row gap-x-[10px]'>
                    <Image
                      className='w-10 h-10 rounded-full'
                      source={{ uri: user?.pic }}></Image>
                    <View className='flex flex-row items-start'>
                      <Text className='mr-1 text-base font-medium'>{user?.name}</Text>
                    </View>
                  </View>
                  <View className='pt-8 pl-12'>
                    <Text className='text-sm text-black/50'>Write what you think....</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {posts.length > 0 && posts.map(post => <CardPosts key={post._id} post={post} handleFunction={handleFetchAgaim}></CardPosts>)}
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
            <Text onPress={handleCreatePosts} disabled={loadingCreate} className=' px-5 py-[4px] font-medium text-white rounded-md bg-orangecustom'>Post</Text>
          </View>
          {/* // content modal notification */}
          <ScrollView>
            <View className='px-[20px] flex flex-row flex-wrap w-full'>
              {loadingCreate && <Text className='text-center'>Loading...</Text>}
              <View className='w-full min-h-[100px] mt-5'>
                <TextInput
                  onChangeText={(t) => setContent(t)}
                  className='w-full min-h-[80px]'
                  textAlignVertical='top'
                  multiline={true}
                  placeholder='write what you think...'
                />
              </View>
              <View className='flex flex-row flex-wrap justify-between w-full'>
                {listImage.length > 0 ? listImage.map((item, index) => <ItemImage key={index} url={item} handleFunction={clearImage}></ItemImage>)
                  : null
                }
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleChoseImage}
            disabled={loadingCreate}
            activeOpacity={0.7} className='absolute right-2 bottom-5'>
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
