import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, TextInput, ScrollView, RefreshControl } from 'react-native';
import Container from '../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import CardPosts from '../../components/card/CardPosts';
import { DataState } from '../../context/DataProvider';
import { URL } from '../../config/enviroment';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const FavouritePosts = () => {
  const { user } = DataState()
  const [postsFavourite, setPostsFavourite] = useState([])
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetchPostsFavourite = async () => {
    setLoading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`${URL}/api/favouritePosts/`, config)
      setPostsFavourite(data.posts)
      setLoading(false)
      setRefreshing(false)
    } catch (error) {
      setLoading(false)
      // Alert.alert("Error", error.message, [
      //   { text: "OK" }
      // ])
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchPostsFavourite()
  }, [])
  return (
    <Container>
      <View className='px-[20px] mb-5 mt-2'>
        <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden '>
          <TextInput
            className='flex-grow'
            placeholderTextColor='#CFCFCF'
            placeholder='search....'></TextInput>
          <Icon
            name='search'
            type='octicon'
            color='#FF6838'
            size={24}
          />
        </View>
      </View>
      <ScrollView
        // onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={() => { setRefreshing(true), fetchPostsFavourite() }}
          />
        }
      >
        <View className='px-[20px]'>
          {loading ? <Text className='text-center text-black/70'>loading...</Text>
            : postsFavourite.length > 0 ?
              postsFavourite.map(post => <CardPosts key={post._id} post={post} pageFavourite={true} handleFunction={fetchPostsFavourite}></CardPosts>)
              : <Text className='text-center text-black/70'>no data...</Text>
          }
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({})

export default FavouritePosts;