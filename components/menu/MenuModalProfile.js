import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MenuModalProfile = ({ showMenu }) => {
  const [showModalPass, setShowModalPass] = useState(false)
  const HandleShowModalPass = () => {
    setShowModalPass(!showModalPass)
  }
  return (
    <View
      /* /////////////////////////////// MENU */
      style={styles.shadowPropMenu}
      className={`bg-white rounded-[10px] absolute right-8 top-3 py-[10px] px-2 transition-all ${showMenu ? '' : 'hidden'}`}>
      <TouchableOpacity onPress={HandleShowModalPass}>
        <View className='flex flex-row items-center mb-1 gap-x-2'>
          <Icon
            name='lock'
            type='feather'
            color='#FF6838'
            size={16}
          />
          <Text className='text-black/50'>Change password</Text>
        </View>
      </TouchableOpacity>
      <View className='flex flex-row items-center gap-x-2'>
        <Ionicons name='log-out-outline' size={22} color='#FF6838' />
        <Text className='text-black/50'>Logout</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModalPass}
        onRequestClose={HandleShowModalPass}>
        <View className='w-full h-full flex justify-center items-center bg-transparent'>
          <View className='bg-white rounded-lg p-4' style={[{ width: windowWidth / 1.3 }, styles.shadowPropMenu]}>
            <Text className='font-medium text-lg text-black text-center mb-5'>Change password</Text>
            <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
              <TextInput
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='Enter old password...'></TextInput>
            </View>
            <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
            <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
              <TextInput
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='Enter old password...'></TextInput>
            </View>
            <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>
            <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
              <TextInput
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='Enter old password...'></TextInput>
            </View>
            <Text className='text-xs text-red-500 italic mb-2'>*erro</Text>

            <View className='flex flex-row justify-between items-center'>
              <TouchableOpacity onPress={HandleShowModalPass}>
                <Text className='py-2 px-6 rounded-lg bg-violetcustom2 text-white'>Cancel</Text>
              </TouchableOpacity>
              <Text className='py-2 px-6 rounded-lg bg-orangecustom text-white'>Confirm</Text>
            </View>
          </View>
        </View>
      </Modal>
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
        // borderRadius: 50,
      },
      default: {}
    })
  }
})

export default MenuModalProfile;
