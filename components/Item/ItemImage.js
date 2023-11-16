import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ItemImage = ({ url, handleFunction }) => {
  return (
    <View
      className='mb-2 overflow-hidden rounded-lg relative'
      style={{ width: windowWidth / 2 - 25, height: 150 }}>
      <Image className='w-full h-full'
        source={{ uri: url }}></Image>
      <TouchableOpacity
        onPress={() => handleFunction(url)}
        className='absolute flex items-center justify-center w-5 h-5 rounded-sm bg-black/60'>
        <Ionicons name='close' size={20} color='white' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({})

export default ItemImage;
