import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
// image 
import avatarSmall from "../../assets/image/avatarSmall.png"
import testImage from "../../assets/image/test.jpg"
const CardNewsFeed = (props) => {
  const { newFeed } = props
  return (
    <View
      style={styles.shadowPropHome}
      className='w-[120px] h-[160px] rounded-[10px] bg-white relative  m-2 ml-0'>
      <Image
        className='object-cover w-full h-full rounded-lg'
        source={{ uri: newFeed.media }}></Image>
      <View className='absolute flex flex-row items-center bottom-2 left-2 gap-x-1'>
        <Image
          className='rounded-full w-[26px] h-[26px]'
          source={{ uri: newFeed.poster.pic }}></Image>
        <Text className='text-sm font-medium text-white'>{newFeed.poster.name}</Text>
      </View>
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
        elevation: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  }
})
export default CardNewsFeed;
