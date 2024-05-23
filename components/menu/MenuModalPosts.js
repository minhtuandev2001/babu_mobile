import { Icon } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataState } from '../../context/DataProvider';
import { Ionicons } from '@expo/vector-icons';

const MenuModalPosts = (props) => {
  const { showMenu, idPoster, showModaleEditPost, handleRemovePost, switchProfileOther, pageFavourite, favouritePosts, unFavouritePosts } = props;
  const navigation = useNavigation()
  const { user } = DataState()
  return (
    <View
      /* /////////////////////////////// MENU */
      style={styles.shadowPropMenu}
      className={`bg-white rounded-[10px] absolute right-8 top-3 py-[10px] px-2 transition-all ${showMenu ? '' : 'hidden'}`}>
      {idPoster === user?._id ?
        <>
          <TouchableOpacity
            onPress={showModaleEditPost}
            className='flex flex-row items-center mb-1 gap-x-2'>
            <Ionicons name='ios-create-outline' size={18} color='#FF6838' />
            <Text className='text-black/50'>Edit post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemovePost}
            className='flex flex-row items-center gap-x-2'>
            <Ionicons name='remove-circle-outline' size={18} color='#FF6838' />
            <Text className='text-black/50'>Remove post</Text>
          </TouchableOpacity>
        </>
        : pageFavourite ?
          <>
            <TouchableOpacity
              onPress={unFavouritePosts}
              className='flex flex-row items-center mb-1 gap-x-2'>
              <Icon
                name='heart'
                type='feather'
                color='#FF6838'
                size={16}
              />
              <Text className='text-black/50'>Un Favourite</Text>
            </TouchableOpacity>
          </>
          : <>
            <TouchableOpacity
              onPress={favouritePosts}
              className='flex flex-row items-center mb-1 gap-x-2'>
              <Icon
                name='heart'
                type='feather'
                color='#FF6838'
                size={16}
              />
              <Text className='text-black/50'>Favourite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={switchProfileOther}
              className='flex flex-row items-center gap-x-2'>
              <Icon
                name='user'
                type='feather'
                color='#FF6838'
                size={16}
              />
              <Text className='text-black/50'>Profile</Text>
            </TouchableOpacity>
          </>
      }
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
