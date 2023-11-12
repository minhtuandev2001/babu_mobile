import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput } from 'react-native';

const ItemChat = () => {
  const [showChatBox, setShowChatBox] = useState(false)
  const HandleChatBox = () => {
    setShowChatBox(!showChatBox)
  }
  return (
    <TouchableOpacity onPress={HandleChatBox}>
      <View className='flex flex-row items-center gap-4 py-2'>
        <View className='relative'>
          <View className='overflow-hidden rounded-full w-11 h-11'>
            <Image className='w-full h-full' source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
          </View>
          <View className=' absolute top-0 -left-[2px] z-20 w-4 h-4 bg-green-500 rounded-full border-[2px] border-white'></View>
        </View>
        <View className='flex-grow'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='flex-grow text-base font-medium'>Lisa</Text>
            <Text className='text-sm font-medium text-black/50'>23 mins</Text>
          </View>
          <Text className='font-medium text-black/50'>chao ban</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showChatBox}
        onRequestClose={HandleChatBox}>
        <View className='w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center px-[20px] border-b border-graycustom pb-4'>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.shadowProp}
              className='flex items-center justify-center w-8 h-8 bg-white rounded-lg mr-4'
              onPress={HandleChatBox}>
              <Icon
                name='chevron-left'
                type='octicon'
                color='#FF6838'
                size={14}
              />
            </TouchableOpacity>
            <View className='flex flex-row gap-3 items-center'>
              <View className='w-[35px] h-[35px] rounded-full overflow-hidden'>
                <Image className='w-full h-full' source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
              </View>
              <Text className='text-base font-medium'>Joaquin</Text>
            </View>
          </View>
          {/* // content modal posts detail   */}

          <View className='absolute bottom-0 w-full bg-white p-[20px]'>
            <View className='flex flex-row w-full items-center'>
              <TextInput
                className='flex-grow pl-3 mr-3 py-1 rounded-lg bg-graycustom/30'
                placeholderTextColor='#CFCFCF'
                placeholder='messs...'></TextInput>
              <TouchableOpacity activeOpacity={0.7}
              >
                <Ionicons name='paper-plane' size={24} color='#FF6838' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
        elevation: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  }
})

export default ItemChat;
