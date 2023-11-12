import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const Comment = () => {
  return (
    <View className='flex flex-row gap-3 mb-3'>
      <View className='overflow-hidden rounded-full w-9 h-9'>
        <Image
          className='object-cover w-full h-full'
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
      </View>
      <View style={{ width: windowWidth / 1.7 }} className='p-2 rounded-lg bg-graycustom/30'>
        <View className='flex flex-row justify-between mb-2'>
          <Text className='text-sm font-medium'>Joaquin</Text>
          <Text className='text-xs font-medium text-black/50'>1 hours ago</Text>
        </View>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione incidunt, id veritatis aliquam eaque mollitia rerum ipsam cum nihil fugiat?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})

export default Comment;
