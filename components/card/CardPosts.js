import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { Icon } from '@rneui/themed';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import MenuModalPosts from '../menu/MenuModalPosts';
import Comment from '../comment/Comment';
import { DataState } from '../../context/DataProvider';
import axios from 'axios';
import { URL } from '../../config/enviroment';
import ItemImage from '../Item/ItemImage';
import { handleUpload2, openImagePickerAsync } from '../../config/Upload';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const url = URL
const CardPosts = (props) => {
  const { post, handleFunction, pageFavourite } = props
  const navigation = useNavigation()
  const { user } = DataState()
  const [showMenu, setShowMenu] = useState(false) // show menu posts in page home
  const [showMenuPostDetail, setShowMenuPostDetail] = useState(false) // show menu posts in modal detail page
  const [buttonHeart, setButtonHeart] = useState((post?.userLikes?.includes(user?._id)))
  const [modalPostDetail, setModalPostDetail] = useState(false)
  const [comment, setComment] = useState('')
  const [countFavourite, setCountFavourite] = useState(post.userLikes.length)
  const [loadingComment, setLoadingComment] = useState(false) // loading danh sach comment
  const [loadingComment2, setLoadingComment2] = useState(false) // cho button comment
  const [listComment, setListComment] = useState()

  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [contentUpdate, setContentUpdate] = useState('')
  const [imagesUpadate, setImagesUpdate] = useState([])
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const handleComment = async () => {
    setLoadingComment(true)
    if (comment === '') {
      Alert.alert('Wring', 'You are leaving the content blank', [
        { text: 'OK' },
      ]);
      return
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        }
        const { data } = await axios.post(`${url}/api/comment/`,
          { content: comment, postId: post._id }, config)
        Alert.alert('Success', '', [
          { text: 'OK' },
        ]);
        fetchComment()
        setLoadingComment(false)
      } catch (error) {
        setLoadingComment(false)
        // Alert.alert("Error", error.message, [
        //   { text: "OK" }
        // ])
        console.log(error.message)
      }
    }
  }
  const handleFavouritePosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put(`${url}/api/posts/heart`,
        { userId: user._id, postId: post._id }, config)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  const handlenotFavouritePosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put(`${url}/api/posts/removeHeart`,
        { userId: user._id, postId: post._id }, config)
    } catch (error) {
      // Alert.alert("Error", error.message, [
      //   { text: "OK", }
      // ])
      console.log(error.message)
    }
  }
  // menu show in page HOME
  const handleShowMenuPost = () => {
    setShowMenu(!showMenu)
  }
  const clearImage = (url) => {
    setImagesUpdate(imagesUpadate.filter(image => image !== url))
  }
  const handleChoseImage = async () => {
    setLoadingUpdate(true)
    let image = await openImagePickerAsync()
    if (image) {
      handleUpload2(image, imagesUpadate, setImagesUpdate, setLoadingUpdate)
    }
    setLoadingUpdate(false)
  }
  const handleUpdate = async () => {
    setLoadingUpdate(true)
    if (contentUpdate === '') {
      Alert.alert('warning', 'This field cannot be left blank', [
        { text: 'OK', onPress: () => setLoadingUpdate(falsefalse) },
      ])
      return
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const dataUpdate = {
        postId: post._id,
        content: contentUpdate,
        images: imagesUpadate
      }
      const { data } = await axios.put(`${url}/api/posts/updatePost`, dataUpdate, config)
      handleFunction()
      setLoadingUpdate(false)
    } catch (error) {
      setLoadingUpdate(false)
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  const removePost = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      await axios.delete(`${url}/api/posts/removePost/${post._id}`, config)
      Alert.alert('Success', 'Delete post successfully', [
        { text: 'OK' }
      ])
      handleFunction()
    } catch (error) {
      // Alert.alert('Error', 'error while deleting post', [
      //   { text: 'OK' }
      // ])
      console.log(error.message)
    }
  }
  // menu show in page PostDetail
  const handleShowMenuPostDetail = () => {
    setShowMenuPostDetail(!showMenuPostDetail)
  }
  const handlePostDetail = () => {
    setShowMenu(false)
    setShowMenuPostDetail(false)
    setModalPostDetail(!modalPostDetail)
    setShowMenuPostDetail(false)
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
      const { data } = await axios.get(`${url}/api/comment/${post._id}`, config)
      setListComment(data)
      setLoadingComment2(false)
    } catch (error) {
      setLoadingComment2(false)
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchComment()
  }, [])
  const showModaleEditPost = () => {
    // show modal edit post
    setContentUpdate(post.content)
    setImagesUpdate(post.media || [])
    setShowModalUpdate(!showModalUpdate)
  }
  const hiddenModalEditPost = () => {
    // hidden modal edit post
    setShowMenu(false)
    setContentUpdate('')
    setImagesUpdate([])
    setShowModalUpdate(!showModalUpdate)
  }
  const handleRemovePost = () => {
    Alert.alert('Warning', 'Confirm deletion of this post', [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => removePost() }
    ])
  }
  const switchProfileOther = () => {
    navigation.navigate('profileOther', { params: { _id: post.poster._id } })
  }
  const favouritePosts = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      await axios.post(`${URL}/api/favouritePosts`, { idPosts: post._id }, config)
      Alert.alert("Success", "Added to favorites list successfully", [
        { text: "OK", onPress: () => handleShowMenuPost() }
      ])
    } catch (error) {
      Alert.alert("Error", error.message, [
        { text: "OK", onPress: () => handleShowMenuPost() }
      ])
      console.log(error.message)
    }
  }
  const unFavouritePosts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      await axios.post(`${URL}/api/favouritePosts/unfavouritePosts`, { postsId: post._id }, config)
      handleFunction()
      Alert.alert("Success", "remove favorites successfully", [
        { text: "OK", onPress: () => handleShowMenuPost() }
      ])
    } catch (error) {
      console.log(error.message)
    }
  }
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
        <TouchableOpacity onPress={handleShowMenuPost}>
          <View className='flex items-center justify-center rotate-90'>
            <Icon name='kebab-horizontal' type='octicon' color='#FF6838' size={18} />
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
            <View className='flex flex-row gap-x-1'>
              {buttonHeart ?
                <TouchableOpacity onPress={() => { setButtonHeart(!buttonHeart), setCountFavourite(countFavourite => countFavourite - 1), handlenotFavouritePosts() }}>
                  <Icon name='heart-fill' type='octicon' color='#FF6464' size={20} />
                </TouchableOpacity>
                : <TouchableOpacity onPress={() => { setButtonHeart(!buttonHeart), setCountFavourite(countFavourite => countFavourite + 1), handleFavouritePosts() }}>
                  <Icon name='heart' type='octicon' color='#FF6464' size={20} />
                </TouchableOpacity>}
              <Text className='text-black/70'>{countFavourite}</Text>
            </View>
            <View className='flex flex-row gap-x-1'>
              <TouchableOpacity onPress={handlePostDetail}>
                <Icon name='comment' type='octicon' color='#FF6838' size={20} />
              </TouchableOpacity>
              <Text className='text-black/70'>{listComment?.length}</Text>
            </View>
          </View>
          {/* <Icon name='share-android' type='octicon' color='#FF6838' size={20} /> */}
        </View>
      </View>
      {/* /////////////////////////////// MENU */}
      <MenuModalPosts showMenu={showMenu} idPoster={post.poster._id} showModaleEditPost={showModaleEditPost} hiddenModalEditPost={hiddenModalEditPost} handleRemovePost={handleRemovePost} switchProfileOther={switchProfileOther} pageFavourite={pageFavourite} favouritePosts={favouritePosts} unFavouritePosts={unFavouritePosts}></MenuModalPosts>
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
                <TouchableOpacity onPress={handleShowMenuPostDetail}>
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
                    className='bg-red-400 rounded-[10px] overflow-hidden'>
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
                    {buttonHeart ?
                      <TouchableOpacity onPress={() => { setButtonHeart(!buttonHeart), handlenotFavouritePosts() }}>
                        <Icon name='heart-fill' type='octicon' color='#FF6464' size={20} />
                      </TouchableOpacity>
                      : <TouchableOpacity onPress={() => { setButtonHeart(!buttonHeart), handleFavouritePosts() }}>
                        <Icon name='heart' type='octicon' color='#FF6464' size={20} />
                      </TouchableOpacity>}
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
              <MenuModalPosts showMenu={showMenuPostDetail} idPoster={post.poster._id} showModaleEditPost={showModaleEditPost} hiddenModalEditPost={hiddenModalEditPost} handleRemovePost={handleRemovePost} switchProfileOther={switchProfileOther} pageFavourite={pageFavourite}></MenuModalPosts>
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
              <TouchableOpacity
                disabled={loadingComment}
                activeOpacity={0.7}
                onPress={handleComment}
              >
                <View className='flex items-center justify-center h-8 rounded-full w-14 bg-orangecustom'>
                  <Text className='text-base font-semibold text-white'>{loadingComment ? 'loading' : 'send'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* // modal update posting  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalUpdate}
        onRequestClose={() => hiddenModalEditPost()}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={() => hiddenModalEditPost()}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Update new posts</Text>
            </View>
            <Text
              onPress={handleUpdate}
              className=' px-5 py-[4px] font-medium text-white rounded-md bg-orangecustom'>Update</Text>
          </View>
          {/* // content modal update post */}
          <ScrollView>
            <View className='px-[20px] flex flex-row flex-wrap w-full'>
              {loadingUpdate && <Text className='text-center'>Loading...</Text>}
              <View className='w-full min-h-[100px] mt-5'>
                <TextInput
                  onChangeText={(t) => setContentUpdate(t)}
                  defaultValue={contentUpdate}
                  className='w-full min-h-[80px]'
                  textAlignVertical='top'
                  multiline={true}
                  placeholder='write what you think...'
                />
              </View>
              <View className='flex flex-row flex-wrap justify-between w-full'>
                {imagesUpadate.length > 0 ? imagesUpadate.map((item, index) => <ItemImage key={index} url={item} handleFunction={clearImage}></ItemImage>)
                  : null
                }
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleChoseImage}
            disabled={loadingUpdate}
            activeOpacity={0.7} className='absolute right-2 bottom-5'>
            <View className='flex items-center justify-center rounded-full w-11 h-11 bg-orangecustom'>
              <Icon name='plus' type='octicon' color='white' size={24} />
            </View>
          </TouchableOpacity>
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
