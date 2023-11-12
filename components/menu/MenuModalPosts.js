import { Icon } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MenuModalPosts = ({ showMenu }) => {
  return (
    <View
      /* /////////////////////////////// MENU */
      style={styles.shadowPropMenu}
      className={`bg-white rounded-[10px] absolute right-8 top-3 py-[10px] px-2 transition-all ${showMenu ? '' : 'hidden'}`}>
      <View className='flex flex-row items-center mb-1 gap-x-2'>
        <Icon
          name='heart'
          type='feather'
          color='#FF6838'
          size={16}
        />
        <Text className='text-black/50'>Following</Text>
      </View>
      <View className='flex flex-row items-center mb-1 gap-x-2'>
        <Icon
          name='user'
          type='feather'
          color='#FF6838'
          size={16}
        />
        <Text className='text-black/50'>Profile</Text>
      </View>
      <View className='flex flex-row items-center gap-x-2'>
        <Icon
          name='x-circle'
          type='feather'
          color='#FF6838'
          size={16}
        />
        <Text className='text-black/50'>display restrictions</Text>
      </View>
    </View>
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
  }
})

export default MenuModalPosts;
