import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import MenuModalPosts from '../menu/MenuModalPosts';
import Comment from '../comment/Comment';
import { DataState } from '../../context/DataProvider';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const url = process.env.REACT_APP_URL
const CardPosts = ({ post, handleFunction }) => {
  const { user } = DataState()
  const [showMenu, setShowMenu] = useState(false)
  const [showMenuPostDetail, setShowMenuPostDetail] = useState(false)
  const [buttonHeart, setButtonHeart] = useState((post?.userLikes?.includes(user?._id)))
  const [modalPostDetail, setModalPostDetail] = useState(false)
  const [comment, setComment] = useState('')
  const [loadingComment, setLoadingComment] = useState(false)
  const [loadingComment2, setLoadingComment2] = useState(false)
  const [listComment, setListComment] = useState()
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const handleComment = async () => {
    setLoadingComment(true)
    if (comment === '') {
      Alert.alert('Wring', 'You are leaving the content blank', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        }
        console.log('chao')
        const { data } = await axios.post(`${url}/api/comment/`,
          { content: comment, postId: post._id }, config)
        console.log(data)
        Alert.alert('Success', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        fetchComment()
        setLoadingComment(false)
      } catch (error) {
        setLoadingComment(false)
        console.log(error.message)
      }
    }
  }
  const handleFavouritePosts = async () => {
    setButtonHeart(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put(`${url}/api/posts/heart`,
        { userId: user._id, postId: post._id }, config)
      handleFunction()
    } catch (error) {
      console.log(error)
    }
  }
  const handlenotFavouritePosts = async () => {
    setButtonHeart(false)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put(`${url}/api/posts/removeHeart`,
        { userId: user._id, postId: post._id }, config)
      handleFunction()
    } catch (error) {
      console.log(error)
    }
  }
  const handlePostDetail = () => {
    setShowMenu(false)
    setShowMenuPostDetail(false)
    setModalPostDetail(!modalPostDetail)
  }
  const fetchComment = async () => {
    try {
      setLoadingComment2(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      console.log('chaosdafshihashihfuhh')
      const { data } = await axios.get(`${url}/api/comment/${post._id}`, config)
      console.log(data)
      setListComment(data)
      setLoadingComment2(false)
    } catch (error) {
      setLoadingComment2(false)
    }
  }
  useEffect(() => {
    fetchComment()
  }, [])
  return (
    <View
      style={[styles.shadowPropHome]}
      className='p-[14px] rounded-[10px] bg-white mb-5 relative '>
      <View className='flex flex-row justify-between'>
        <View className='flex flex-row gap-x-[10px] '>
          <Image
            className='w-10 h-10 rounded-full'
            source={{ uri: post.poster.pic }}></Image>
          <View className=''>
            <Text className='mr-1 text-base font-medium'>{post.poster.name}</Text>
            <Text className="text-sm font-medium text-black/50">{post.createdAt.split("T")[1].split(":")[0]}:{post.createdAt.split("T")[1].split(":")[1]}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <View className='flex items-center justify-center rotate-90'>
            {post?.poster?._id == user?._id && <Icon name='kebab-horizontal' type='octicon' color='#FF6838' size={18} />}
          </View>
        </TouchableOpacity>
      </View>
      <View className='pt-3 pl-12'>
        <TouchableOpacity onPress={() => handlePostDetail()} activeOpacity={0.9}>
          <Text
            numberOfLines={2}
            className='mb-4 text-sm text-black'>{post.content}</Text>
        </TouchableOpacity>
        {post?.media?.length > 0 ?
          <TouchableOpacity
            onPress={() => handlePostDetail()}
            style={{ height: windowHeight / 4 }}
            className='bg-red-400 rounded-[10px] overflow-hidden '>
            <Swiper
              dot={
                <View style={{ backgroundColor: '#DCE0DB', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: -10, }} />
              }
              activeDot={
                <View style={{ backgroundColor: '#FF6838', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: -10, }} />
              }
            >

              {post.media.map((item, index) => <Image
                className='object-cover object-center h-full'
                key={index} source={{ uri: item }} />)}
            </Swiper>
          </TouchableOpacity>
          : null}
        <View className='flex flex-row justify-between mt-3'>
          <View className='flex flex-row  w-[50px] justify-between gap-x-4'>
            {buttonHeart ?
              <TouchableOpacity onPress={() => handlenotFavouritePosts()}>
                <Icon name='heart-fill' type='octicon' color='#FF6464' size={20} />
              </TouchableOpacity>
              : <TouchableOpacity onPress={() => handleFavouritePosts()}>
                <Icon name='heart' type='octicon' color='#FF6464' size={20} />
              </TouchableOpacity>}
            <TouchableOpacity onPress={handlePostDetail}>
              <Icon name='comment' type='octicon' color='#FF6838' size={20} />
            </TouchableOpacity>
          </View>
          {/* <Icon name='share-android' type='octicon' color='#FF6838' size={20} /> */}
        </View>
      </View>
      {/* /////////////////////////////// MENU */}
      <MenuModalPosts showMenu={showMenu}></MenuModalPosts>
      {/* // menu posts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPostDetail}
        onRequestClose={handlePostDetail}>
        <View className='w-full h-full pt-1 bg-white'>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.shadowPropMenu}
            className='flex items-center justify-center w-8 h-8 bg-white rounded-full mb-5 ml-[20px]'
            onPress={handlePostDetail}>
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
                    source={{ uri: post.poster.pic }}></Image>
                  <View className=''>
                    <Text className='mr-1 text-base font-medium'>{post.poster.name}</Text>
                    <Text className="text-sm font-medium text-black/50">{post.createdAt.split("T")[1].split(":")[0]}:{post.createdAt.split("T")[1].split(":")[1]}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowMenuPostDetail(!showMenuPostDetail)}>
                  <View className='flex items-center justify-center rotate-90'>
                    <Icon name='kebab-horizontal' type='octicon' color='#FF6838' size={20} />
                  </View>
                </TouchableOpacity>
              </View>
              <View className='pt-3 mb-3'>
                <Text
                  className='mb-4 text-sm text-black'>{post.content}</Text>
                {post?.media?.length > 0 ?
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
                      {post.media.map((item, index) => <Image
                        className='object-cover object-center h-full'
                        key={index} source={{ uri: item }} />)}
                    </Swiper>
                  </View>
                  : null}
                <View className='flex flex-row justify-between mt-3'>
                  <View className='flex flex-row  w-[50px] justify-between gap-x-4'>
                    <TouchableOpacity onPress={() => handleFavouritePosts()}>
                      {buttonHeart ?
                        <TouchableOpacity onPress={() => handlenotFavouritePosts()}>
                          <Icon name='heart-fill' type='octicon' color='#FF6464' size={20} />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => handleFavouritePosts()}>
                          <Icon name='heart' type='octicon' color='#FF6464' size={20} />
                        </TouchableOpacity>}
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon name='comment' type='octicon' color='#FF6838' size={20} />
                    </TouchableOpacity>
                  </View>
                  {/* <Icon name='share-android' type='octicon' color='#FF6838' size={20} /> */}
                </View>
              </View>
              {loadingComment2 && <Text className='text-center'>Loading...</Text>}
              {listComment?.length > 0 ?
                listComment.map((item, index) => <Comment key={item._id} comment={item}></Comment>)
                : null
              }
              {/* /////////////////////////////// MENU */}
              <MenuModalPosts showMenu={showMenuPostDetail}></MenuModalPosts>
            </View>
            <View className='w-full h-[80px]'></View>
          </ScrollView>
          <View className='absolute bottom-0 w-full bg-white p-[20px]'>
            <View className='flex flex-row w-full '>
              <TextInput
                onChangeText={t => setComment(t)}
                className='flex-grow pl-3 mr-3 rounded-lg bg-graycustom/30'
                placeholderTextColor='#CFCFCF'
                placeholder='comment...'></TextInput>
              <TouchableOpacity disabled={loadingComment} activeOpacity={0.7} onPress={handleComment}>
                <View className='flex items-center justify-center w-14 h-8 rounded-full bg-orangecustom'>
                  <Text className='text-white font-semibold text-base'>{loadingComment ? 'loading' : 'send'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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

export default CardPosts;
