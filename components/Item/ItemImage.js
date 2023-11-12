import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ItemImage = () => {
  return (
    <View
      className='mb-2 overflow-hidden rounded-lg'
      style={{ width: windowWidth / 2 - 25, height: 150 }}>
      <Image className='w-full h-full'
        source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({})

export default ItemImage;
