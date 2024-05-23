import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { URL } from '../../config/enviroment';
import axios from 'axios';
import { Alert } from 'react-native';
import { DataState } from '../../context/DataProvider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MenuModalProfile = ({ showMenu, handleFunction }) => {
  const { user } = DataState()
  const [showModalPass, setShowModalPass] = useState(false)
  const [passNew, setPassNew] = useState('')
  const [passNewConfirm, setPassNewConfirm] = useState('')
  const [error, setError] = useState({
    passNew: "",
    passNewConfirm: ""
  })
  const HandleShowModalPass = () => {
    setShowModalPass(!showModalPass)
  }
  const handleUpdatePass = async () => {
    setError({
      passNew: "",
      passNewConfirm: ""
    })
    let check = false // kiểm tra lỗi, default không lỗi
    if (passNew === "" || passNewConfirm === "") {
      check = true
    }
    if (passNew === "") {
      setError(error => ({ ...error, passNew: "This field cannot be left blank" }))
    }
    if (passNewConfirm === "") {
      setError(error => ({ ...error, passNewConfirm: "This field cannot be left blank" }))
    }
    if (passNew !== passNewConfirm) {
      setError(error => ({ ...error, passNewConfirm: "Confirmation password does not match" }))
      check = true
    }
    if (check) { // có lỗi
      return
    }
    // change
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      }
      await axios.put(`${URL}/api/user/changePass`, { passNew }, config)
      HandleShowModalPass()
      Alert.alert("success", "Change password success", [
        { text: "OK" }
      ])
    } catch (error) {
      console.log(error)
    }
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
      <TouchableOpacity onPress={handleFunction} className='flex flex-row items-center gap-x-2'>
        <Ionicons name='log-out-outline' size={22} color='#FF6838' />
        <Text className='text-black/50'>Logout</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModalPass}
        onRequestClose={HandleShowModalPass}>
        <View className='flex items-center justify-center w-full h-full bg-transparent'>
          <View className='p-4 bg-white rounded-lg' style={[{ width: windowWidth / 1.3 }, styles.shadowPropMenu]}>
            <Text className='mb-5 text-lg font-medium text-center text-black'>Change password</Text>
            <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
              <TextInput
                onChangeText={(t) => setPassNew(t)}
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='Enter old password...'></TextInput>
            </View>
            <Text className='mb-2 text-xs italic text-red-500'>{error.passNew}</Text>
            <View className='bg-graycustom/30 flex flex-row py-1 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-1'>
              <TextInput
                onChangeText={(t) => setPassNewConfirm(t)}
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='Enter old password...'></TextInput>
            </View>
            <Text className='mb-2 text-xs italic text-red-500'>{error.passNewConfirm}</Text>

            <View className='flex flex-row items-center justify-between'>
              <TouchableOpacity onPress={HandleShowModalPass}>
                <Text className='px-6 py-2 text-white rounded-lg bg-violetcustom2'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdatePass}>
                <Text className='px-6 py-2 text-white rounded-lg bg-orangecustom'>Confirm</Text>
              </TouchableOpacity>
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
