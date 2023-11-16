import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, TextInput, ScrollView, Animated, Easing } from 'react-native';
import Container from '../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import CardPosts from '../../components/card/CardPosts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Follow = () => {
  const [naviPage, setNaviPage] = useState(false)
  const [showNavibar, setShowNavibar] = useState(false)
  const [start, setStart] = useState(false)
  const handleScroll = (event) => {

  }

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
      <Animated.ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className='px-[20px]'>
          {/* <CardPosts></CardPosts>
          <CardPosts></CardPosts>
          <CardPosts></CardPosts>
          <CardPosts></CardPosts>
          <CardPosts></CardPosts> */}
        </View>
      </Animated.ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({})

export default Follow;