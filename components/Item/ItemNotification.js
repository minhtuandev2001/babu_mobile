import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Image, Text } from 'react-native';


const ItemNotification = () => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View className=''>
        <View className='flex flex-row gap-x-3 px-[20px] bg-graycustom/30 py-2'>
          <View className='overflow-hidden rounded-full w-11 h-11'>
            <Image
              className="w-full h-full"
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
          </View>
          <View>
            <View className='flex flex-row gap-2'>
              <Text className='font-medium'>Lisa</Text>
              <Text>love your post</Text>
            </View>
            <Text className='text-sm text-black/50'>5 hour ago</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})

export default ItemNotification;
