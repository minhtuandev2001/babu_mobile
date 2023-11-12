import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';

const ItemAddGroup = () => {
  return (
    <View className='w-[50] relative mx-3 mb-3'>
      <View className='w-[50px] h-[50px] rounded-lg overflow-hidden'>
        <Image className='w-full h-full' source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
      </View>
      <Text className='mx-auto text-sm'>tuan</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.shadowProp}
        // onPress={}
        className='absolute w-5 h-5 -top-2 -right-2'>
        <View className='flex items-center justify-center w-5 h-5 rounded-sm bg-black/60'>
          <Ionicons name='close' size={14} color='white' />
        </View>
      </TouchableOpacity>
    </View>
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
        elevation: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
      },
      default: {}
    })
  }
})

export default ItemAddGroup;
