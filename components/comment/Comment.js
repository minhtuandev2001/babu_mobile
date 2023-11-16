import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const Comment = ({ comment }) => {
  return (
    <View className='flex flex-row gap-3 mb-3'>
      <View className='overflow-hidden rounded-full w-9 h-9'>
        <Image
          className='object-cover w-full h-full'
          source={{ uri: comment.commenter?.pic }}></Image>
      </View>
      <View style={{ width: windowWidth / 1.7 }} className='p-2 rounded-lg bg-graycustom/30'>
        <View className='flex flex-row justify-between mb-2'>
          <Text className='text-sm font-medium'>{comment.commenter?.name}</Text>
          <Text className='text-xs font-medium text-black/50'>{comment.createdAt.split("T")[1].split(":")[0]}:{comment.createdAt.split("T")[1].split(":")[1]}</Text>
        </View>
        <Text>
          {comment.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})

export default Comment;
