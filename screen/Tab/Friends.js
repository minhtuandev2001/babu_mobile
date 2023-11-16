import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import Container from '../../components/layouts/Container';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import CardPosts from '../../components/card/CardPosts';

const Friends = () => {
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
      <ScrollView
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
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({})

export default Friends;