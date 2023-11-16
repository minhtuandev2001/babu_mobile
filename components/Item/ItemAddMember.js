import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ItemAddMember = ({ user, handleFunction }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleFunction}
      className='flex flex-row gap-4 mb-4'>
      <View className='w-[50px] h-[50px] rounded-lg overflow-hidden'>
        <Image className='w-full h-full' source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww' }}></Image>
      </View>
      <View>
        <Text className='text-base font-medium'>{user.name}</Text>
        <Text className='text-black/70'>{user.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})

export default ItemAddMember;
