import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, Modal, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native"
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
import { handleUpload2, handleUploadOne, openImagePickerAsync } from '../../config/Upload';
import { TouchableWithoutFeedback } from 'react-native';
import { URL } from '../../config/enviroment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const url = URL
const Home = () => {
  const navigation = useNavigation()
  const { user } = DataState()
  const [showModalNotif, setShowModalNotif] = useState(false)
  const [showModalPosting, setShowModalPosting] = useState(false)
  const [showModalCreateNewFeed, setShowModalCreateNewFeed] = useState(false)

  const [posts, setPosts] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)

  const [newFeed, setNewFeed] = useState([])
  const [fetchAgainNewFeed, setFetchAgainNewFeed] = useState(false)
  const [newsFeedImage, setNewsFeedImage] = useState("")
  const [loadingChooseImageNewFeed, setLoadingChooseImageNewFeed] = useState(false)

  const [content, setContent] = useState('')
  const [listImage, setListImage] = useState([])
  const [chooseImage, setChooseImage] = useState()
  const [loadingCreate, setLoadingCreate] = useState(false)

  const [focusInput, setFocusInput] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [querySearchPost, setquerySearchPost] = useState("")
  const handleChoseImage = async () => {
    setLoadingCreate(true)
    let image = await openImagePickerAsync()
    handleUpload2(image, listImage, setListImage, setLoadingCreate)
  }
  const handleChoseImageForNewFeed = async () => {
    setLoadingChooseImageNewFeed(true)
    let image = await openImagePickerAsync()
    handleUploadOne(image, setNewsFeedImage, setLoadingChooseImageNewFeed)
  }
  const clearImage = (url) => {
    setListImage(listImage.filter(image => image !== url))
  }
  const handleCreatePosts = async () => {
    setLoadingCreate(true)
    if (content === '') {
      Alert.alert('Warning', 'You are leaving the content blank', [
        { text: 'OK' },
      ]);
      setLoadingCreate(false)
      return
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.post(`${url}/api/posts/`,
          { content, images: listImage }, config)
        handleFetchAgain()
        Alert.alert('Success', '', [
          { text: 'OK' },
        ]);
        setLoadingCreate(false)
      } catch (error) {
        setLoadingCreate(false)
        // Alert.alert("Error", error.message, [
        //   { text: "OK" }
        // ])
        console.log(error.message)
      }
    }
  }
  const handleCreateNewsFeed = async () => {
    setLoadingChooseImageNewFeed(true)
    // if (newsFeedImage === '') {
    //   Alert.alert('Warning', 'Please select the photo first', [
    //     { text: 'OK' },
    //   ]);
    //   setLoadingChooseImageNewFeed(false)
    //   return
    // } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(`${url}/api/newFeed/`,
        { image: newsFeedImage }, config)
      handleFetchAgainNewsFeed()
      Alert.alert('Success', '', [
        { text: 'OK' },
      ]);
      setLoadingChooseImageNewFeed(false)
    } catch (error) {
      setLoadingChooseImageNewFeed(false)
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
    // }
  }
  const handleFetchAgainNewsFeed = () => {
    setFetchAgainNewFeed(!fetchAgainNewFeed)
  }
  const handleFetchAgain = () => {
    setFetchAgain(!fetchAgain)
  }
  const handleModalNotif = () => {
    setShowModalNotif(!showModalNotif)
  }
  const handleModalPosting = () => {
    setShowModalPosting(!showModalPosting)
  }
  const handleModalCreateNewFeed = () => {
    setShowModalCreateNewFeed(!showModalCreateNewFeed)
  }
  const backPageLogin = () => {
    navigation.goBack()
  }
  const fetchPosts = async () => {
    setLoadingSearch(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.get(`${url}/api/posts/?search=${querySearchPost}`, config);
      setLoadingSearch(false)
      setPosts(data);
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  const fetchNewFeed = async () => {
    console.log('chao nhau cai')
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.get(`${url}/api/newFeed/`, config);
      setNewFeed(data);
      console.log(data)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchNewFeed();
  }, [fetchAgainNewFeed])
  useEffect(() => {
    fetchPosts();
  }, [fetchAgain])
  const handleSearchContent = (query) => {
    setquerySearchPost(query)
    setFetchAgain(!fetchAgain)
  }
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className='w-full h-full bg-white'>
          <View className='flex flex-row justify-between items-center mb-[30px] px-[20px]'>
            {focusInput ?
              <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden '>
                <TextInput
                  onChangeText={t => handleSearchContent(t)}
                  className='flex-grow'
                  placeholderTextColor='#CFCFCF'
                  placeholder='search....'></TextInput>
                <TouchableOpacity onPress={() => setFocusInput(false)}>
                  <Icon
                    name='search'
                    type='octicon'
                    color='#FF6838'
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              : <>
                <Text className='text-2xl font-bold text-orangecustom'>Babu Network</Text>
                <View className='flex flex-row gap-x-2'>
                  <TouchableOpacity onPress={() => setFocusInput(true)}>
                    <Icon
                      name='search'
                      type='octicon'
                      color='#FF6838'
                      size={24}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleModalNotif}>
                    <View>
                      <Image
                        className=''
                        source={bellIcon}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            }
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className='max-h-[180px] flex-grow-0 flex-shrink-0'
              horizontal={true}
            >
              <TouchableOpacity onPress={handleModalCreateNewFeed} activeOpacity={1}>
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
              {/* {posts.length > 0 && posts.map(item => item?.media?.length > 0 ? <CardNewsFeed key={item._id} post={item}></CardNewsFeed> : null)}
               */}
              {newFeed.length > 0 && newFeed.map(item => <CardNewsFeed key={item._id} newFeed={item}></CardNewsFeed>)}
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
              {posts.length > 0 && posts.map(post => <CardPosts key={post._id} post={post} handleFunction={handleFetchAgain}></CardPosts>)}
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
          {/* // content modal create post */}
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
      {/* // create new feed */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalCreateNewFeed}
        onRequestClose={handleModalCreateNewFeed}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleModalCreateNewFeed}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Create newsfeed</Text>
            </View>
            <Text onPress={handleCreateNewsFeed} disabled={loadingChooseImageNewFeed} className=' px-5 py-[4px] font-medium text-white rounded-md bg-orangecustom'>Create</Text>
          </View>
          {/* // content modal create post */}
          <ScrollView>
            <View className='px-[20px] flex flex-row flex-wrap w-full'>
              {loadingChooseImageNewFeed && <Text className='text-center'>Loading...</Text>}
              <View className='flex flex-row flex-wrap justify-between w-full'>
                {newsFeedImage !== "" &&
                  <ItemImage url={newsFeedImage} handleFunction={() => setNewsFeedImage("")}></ItemImage>}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleChoseImageForNewFeed}
            disabled={loadingChooseImageNewFeed}
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
