import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Container from '../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import ItemChat from '../../components/Item/ItemChat';
import { Ionicons } from '@expo/vector-icons';
// image
import anh from "../../assets/image/gallery.png"
import ItemAddGroup from '../../components/Item/ItemAddGroup';
import ItemAddMember from '../../components/Item/ItemAddMember';

const Chat = () => {
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false)
  const handleCreateGroup = () => {

  }
  const handleModalCreateGroup = () => {
    setShowModalCreateGroup(!showModalCreateGroup)
  }
  return (
    <Container>
      <View className='px-[20px]'>
        <View className='flex flex-row justify-between mb-3'>
          <Text className='text-base font-medium text-orangecustom'>Inbox</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={handleModalCreateGroup}>
            <Text className='text-base font-medium'>Create group</Text>
          </TouchableOpacity>
        </View>
        <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-4 '>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
        </ScrollView>
      </View>
      {/* // modal create group chat */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalCreateGroup}
        onRequestClose={handleModalCreateGroup}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleModalCreateGroup}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Create posts</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className=' py-[2px] font-medium text-black/50 rounded-md '>Create</Text>
            </TouchableOpacity>
          </View>
          {/* // content modal notification */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className='px-[20px]'>
              <Text className='mb-2 text-base font-medium text-black/70'>Group name</Text>
              <View className='flex flex-row items-center w-full px-4 py-2 mx-auto mb-3 overflow-hidden rounded-lg bg-graycustom/30'>
                <Ionicons name='people-outline' size={24} color='#FF6838' />
                <TextInput
                  className='flex-grow ml-2'
                  placeholderTextColor='#CFCFCF'
                  placeholder='name group...'></TextInput>
              </View>
              <Text className='mb-2 text-base font-medium text-black/70'>Group image</Text>
              <TouchableOpacity activeOpacity={0.95}>
                <View
                  style={styles.shadowProp}
                  className='w-[100px] h-[100px] rounded-lg justify-center items-center bg-white p-2'>
                  <View className='w-8 h-8 mb-2'>
                    <Image className='w-full h-full' source={anh}></Image>
                  </View>
                  <Text className='text-xs'>Upload image</Text>
                </View>
              </TouchableOpacity>
              <Text className='my-2 text-base font-medium text-black/70'>Member</Text>
              <View className='flex flex-row items-center w-full px-4 py-2 mx-auto mb-5 overflow-hidden rounded-lg bg-graycustom/30'>
                <TextInput
                  className='flex-grow ml-2'
                  placeholderTextColor='#CFCFCF'
                  placeholder='name group...'></TextInput>
                <Ionicons name='search' size={24} color='#FF6838' />
              </View>
              <View className='flex flex-row flex-wrap -translate-x-3'>
                <ItemAddGroup></ItemAddGroup>
                <ItemAddGroup></ItemAddGroup>
                <ItemAddGroup></ItemAddGroup>
                <ItemAddGroup></ItemAddGroup>
                <ItemAddGroup></ItemAddGroup>
              </View>
              <View>
                <ItemAddMember></ItemAddMember>
                <ItemAddMember></ItemAddMember>
                <ItemAddMember></ItemAddMember>
                <ItemAddMember></ItemAddMember>
                <ItemAddMember></ItemAddMember>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Container>
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
  },
  shadowProp: {
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
        elevation: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  }
})

export default Chat;