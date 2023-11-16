import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView, TouchableOpacity, Modal, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../components/layouts/Container';
import { Icon } from '@rneui/themed';
import ItemChat from '../../components/Item/ItemChat';
import { Ionicons } from '@expo/vector-icons';
// image
import anh from "../../assets/image/gallery.png"
import ItemAddGroup from '../../components/Item/ItemAddGroup';
import ItemAddMember from '../../components/Item/ItemAddMember';
import { DataState } from '../../context/DataProvider';
import axios from 'axios';
import { useEffect } from 'react';
import { getSender, getSenderFull, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogic';
import { io } from 'socket.io-client';

const url = process.env.REACT_APP_URL
var socket;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Chat = () => {
  const { user, fetchAgain, setsetFetchAgain, chats, setChats } = DataState()
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false)
  const [showModalSearch, setShowModalSearch] = useState(false)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAccess, setLoadingAccess] = useState(false)
  const [loggerUser, setLoggerUser] = useState()

  const [groupChatName, setGroupChatName] = useState("")
  const [selectedUser, setSelectedUser] = useState([])
  const [errorCreateGroup, setErrorCreateGroup] = useState({
    groupChatName: '',
    query: '',
  })
  const [selectedChat, setSelectedChat] = useState()
  const [showChatBox, setShowChatBox] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const scroll = useRef()
  const handleModalCreateGroup = () => {
    setShowModalCreateGroup(!showModalCreateGroup)
  }
  const handleModalSearch = () => {
    setShowModalSearch(!showModalSearch)
  }
  const handleSearch = async () => {
    if (!search) {
      // visibleToast("not value search")
      Alert.alert('Warning', 'not value search', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data);
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      return
    }
  }
  const handleSearch2 = async (query) => {
    if (!query) {
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/user?search=${query}`, config)
      setLoading(false)
      setSearchResult(data);
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      return
    }
  }

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // const ENDPOINT = "http://localhost:5000";
    socket = io(url)
    socket.emit("setup", user)
    socket.on("connected", () => {
      console.log("connected")
      setSocketConnected(true)
    });
    // socket.on("typing", () => setIsTyping(true))
    // socket.on("stop typing", () => setIsTyping(false))
  }, [])
  useEffect(() => {
    getDataLogger();
    fetchChats();
    async function getDataLogger() {
      try {
        const jsonValue = await AsyncStorage.getItem('userInfo');
        // console.log(jsonValue)
        setLoggerUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        // error reading value
        console.log(e)
      }
    };
  }, [fetchAgain])
  const accessChat = async (userId) => {
    try {
      setLoadingAccess(true)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(`${url}/api/chat`, { userId: userId }, config);
      /*
      * kiểm tra xem trong list chats đã có user này chưa , có rồi thì thôi, còn chưa có thì thêm vào trong mảng
      */
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
      Alert.alert('Alert', 'user already exists', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      // console.log(chats)
      // setSelectedChat(data);
      setLoadingAccess(false);
      // onClose();
    } catch (error) {
      console.log(error)
      setLoadingAccess(false);
    }
  }
  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      console.log('chao')
      Alert.alert('Warning', 'user already exists', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      setSelectedUser([...selectedUser, userToAdd])
    }
  }
  const deleteUserSelector = (userDelete) => {
    setSelectedUser(selectedUser.filter(user => user._id !== userDelete._id))
  }
  const handleCreateGroup = async () => {
    setErrorCreateGroup(errorCreateGroup => ({
      ...errorCreateGroup,
      groupChatName: '',
      query: '',
    }))
    if (groupChatName === "") {
      setErrorCreateGroup(errorCreateGroup => ({
        ...errorCreateGroup, groupChatName: '* This field cannot be left blank',
      }))
    }
    if (selectedUser.length < 2) {
      setErrorCreateGroup(errorCreateGroup => ({
        ...errorCreateGroup, query: '* Creating a group requires 2 or more members',
      }))
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      let dataRequest = {
        name: groupChatName,
        users: JSON.stringify(selectedUser.map(u => u._id))
      }
      const { data } = await axios.post(`${url}/api/chat/group`, dataRequest, config)
      setLoading(false)
      setChats([data, ...chats])
    } catch (error) {
      throw new Error(error.message)
    }
  }
  const HandleChatBox = (chatSelected) => {
    setSelectedChat(chatSelected)
    setShowChatBox(true)
  }
  const HandleChatBoxClose = () => {
    setSelectedChat()
    setShowChatBox(false)
  }
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoadingMessage(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${url}/api/message/${selectedChat._id}`, config)
      setMessages(data)
      setLoadingMessage(false)
      socket.emit("join chat", selectedChat._id)
    } catch (error) {
      // visibleToast("Failed to load the messages")
      console.log(error)
      setLoadingMessage(false)
    }
  }
  useEffect(() => {
    fetchMessages()
    // selectedChatCompare = selectedChat;
  }, [selectedChat])

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved])
    })
  })

  const sendMessage = async () => {
    // if (e.key === "Enter" && newMessage) {
    //   socket.emit("stop typing", selectedChat._id)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      setNewMessage("")
      const { data } = await axios.post(`${url}/api/message`, {
        chatId: selectedChat._id,
        content: newMessage
      }, config)
      console.log(data)
      socket.emit("new message", data)
      setMessages([...messages, data])
      scroll.current.scrollToEnd();
      // setFetchAgain(!fetchAgain)
    } catch (error) {
      console.log(error.messages)
    }
    // }
  }
  return (
    <Container>
      <View className='px-[20px]'>
        <View className='flex flex-row justify-between mb-3'>
          <Text className='text-base font-medium text-orangecustom'>Inbox</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={handleModalCreateGroup}>
            <Text className='text-base font-medium'>Create group</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleModalSearch} activeOpacity={1}>
          <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-4 '>
            <Text className='flex-grow text-black/30'>search...</Text>
            <Icon
              name='search'
              type='octicon'
              color='#FF6838'
              size={24}
            />
          </View>
        </TouchableOpacity>
        {chats ?
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {chats.map((chat) => (
              <TouchableOpacity
                onPress={() => HandleChatBox(chat)}
                key={chat._id} className='flex flex-row items-center gap-4 py-2'>
                <View className='relative'>
                  <View className='overflow-hidden rounded-full w-14 h-14'>
                    {!chat.isGroupChat ?
                      <Image className='w-full h-full' source={{ uri: getSender(loggerUser, chat.users) === user.name ? user.pic : chat.users[1].pic }}></Image>
                      : <Image className='w-full h-full' source={{ uri: 'https://png.pngtree.com/element_origin_min_pic/17/09/16/a530132b1c4041d37e1cd5f9f7ea8119.jpg' }}></Image>}
                  </View>
                  {/* {!search && <View className=' absolute top-0 -left-[2px] z-20 w-4 h-4 bg-green-500 rounded-full border-[2px] border-white'></View>} */}
                </View>
                <View className='flex-grow gap-y-1 mb-1'>
                  <View className='flex flex-row items-center justify-between '>
                    <Text className='flex-grow text-lg font-medium'>
                      {loggerUser &&
                        !chat.isGroupChat
                        ? getSender(loggerUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {!search &&
                      <Text className='text-sm font-medium text-black/50'>23 mins</Text>}
                  </View>
                  <Text className='font-medium text-black/50'>{chat.latestMessage?.content !== undefined ? chat.latestMessage?.content : 'send to messages'}</Text>
                </View>
              </TouchableOpacity>
            ))}
            {/* <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat>
          <ItemChat></ItemChat> */}
          </ScrollView>
          : <Text>Loading...</Text>}
      </View>
      {/* // modal create group chat */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalCreateGroup}
        onRequestClose={handleModalCreateGroup}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleModalCreateGroup}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Create posts</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={handleCreateGroup}>
              <Text className=' py-[2px] font-medium text-black/50 rounded-md '>Create</Text>
            </TouchableOpacity>
          </View>
          {/* // content modal notification */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className='px-[20px]'>
              <Text className='mb-2 text-base font-medium text-black/70'>Group name</Text>
              <View className='flex flex-row items-center w-full px-4 py-2 mx-auto mb-1 overflow-hidden rounded-lg bg-graycustom/30'>
                <Ionicons name='people-outline' size={24} color='#FF6838' />
                <TextInput
                  onChangeText={(t) => setGroupChatName(t)}
                  className='flex-grow ml-2'
                  placeholderTextColor='#CFCFCF'
                  placeholder='name group...'></TextInput>
              </View>
              <Text className='mb-2 text-xs text-red-500 italic mt-1'>{errorCreateGroup.groupChatName}</Text>
              {/* <Text className='mb-2 text-base font-medium text-black/70'>Group image</Text>
              <TouchableOpacity activeOpacity={0.95}>
                <View
                  style={styles.shadowProp}
                  className='w-[100px] h-[100px] rounded-lg justify-center items-center bg-white p-2'>
                  <View className='w-8 h-8 mb-2'>
                    <Image className='w-full h-full' source={anh}></Image>
                  </View>
                  <Text className='text-xs'>Upload image</Text>
                </View>
              </TouchableOpacity> */}
              <Text className='my-2 text-base font-medium text-black/70'>Member</Text>
              <View className='flex flex-row items-center w-full px-4 py-2 mx-auto mb-1 overflow-hidden rounded-lg bg-graycustom/30'>
                <TextInput
                  onChangeText={handleSearch2}
                  className='flex-grow ml-2'
                  placeholderTextColor='#CFCFCF'
                  placeholder='name group...'></TextInput>
                <Ionicons name='search' size={24} color='#FF6838' />
              </View>
              <Text className='mb-4 text-xs text-red-500 italic mt-1'>{errorCreateGroup.query}</Text>
              <View className='flex flex-row flex-wrap -translate-x-3'>
                {selectedUser.map(userSelector =>
                  <ItemAddGroup
                    key={userSelector._id}
                    user={userSelector}
                    handleFunction={() => deleteUserSelector(userSelector)}
                  ></ItemAddGroup>
                )}
              </View>
              <View>
                {loading ?
                  <Text>Loading...</Text>
                  : searchResult?.map(user =>
                    <ItemAddMember key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    ></ItemAddMember>
                  )}

              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalSearch}
        onRequestClose={handleModalSearch}>
        <View className='relative w-full h-full pt-1 bg-white'>
          <View className='flex flex-row items-center mb-4 px-[20px] justify-between'>
            <View className='flex flex-row items-center gap-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowPropMenu}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-full'
                onPress={handleModalSearch}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <Text className='text-base font-medium text-orangecustom'>Search</Text>
            </View>
          </View>
          <View className='px-[20px]'>
            <View className='bg-graycustom/30 flex flex-row py-2 w-full px-[18px]  mx-auto items-center rounded-lg overflow-hidden mb-4'>
              <TextInput
                onChangeText={(t) => setSearch(t)}
                editable={true}
                className='flex-grow'
                placeholderTextColor='#CFCFCF'
                placeholder='search....'></TextInput>
              <TouchableOpacity onPress={handleSearch}>
                <Icon
                  name='search'
                  type='octicon'
                  color='#FF6838'
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className='px-[20px]'>
              {loadingAccess ? <Text>Loading...</Text> : null}
              {loading ?
                <Text>Loading...</Text>
                : searchResult?.map(user =>
                  <ItemChat
                    key={user._id}
                    user={user}
                    search={true}
                    handleFunction={() => accessChat(user._id)}
                  ></ItemChat>
                )}
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* // modal chat box  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showChatBox}
        onRequestClose={HandleChatBoxClose}>
        {selectedChat ?
          <View className='w-full h-full pt-1 bg-white'>
            <View className='flex flex-row items-center px-[20px] border-b border-graycustom pb-4'>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.shadowProp}
                className='flex items-center justify-center w-8 h-8 bg-white rounded-lg mr-4'
                onPress={HandleChatBoxClose}>
                <Icon
                  name='chevron-left'
                  type='octicon'
                  color='#FF6838'
                  size={14}
                />
              </TouchableOpacity>
              <View className='flex flex-row gap-3 items-center'>
                <View className='w-[35px] h-[35px] rounded-full overflow-hidden'>
                  <Image className='w-full h-full' source={{
                    uri: !selectedChat.isGroupChat ?
                      getSenderFull(user, selectedChat.users).pic
                      : 'https://png.pngtree.com/element_origin_min_pic/17/09/16/a530132b1c4041d37e1cd5f9f7ea8119.jpg'
                  }}></Image>
                </View>
                <Text className='text-base font-medium'>
                  {!selectedChat.isGroupChat ?
                    getSender(user, selectedChat.users)
                    : selectedChat.chatName
                  }
                </Text>
              </View>
            </View>
            {/* // content modal  */}
            <View
              style={{ height: windowHeight - 135 }}
              className='w-full bg-white flex px-[10px]'>
              <ScrollView ref={scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {loadingMessage ?
                  <Text>Loading...</Text>
                  : (messages && messages.map((item, index) => (
                    <View key={item._id} className={`flex flex-row items-end ${item.sender._id === user._id ? 'self-end' : ''}`}>
                      {(isSameSender(messages, item, index, user._id) || isLastMessage(messages, index, user._id)) &&
                        <View className='w-8 h-8 rounded-full overflow-hidden'>
                          <Image
                            className='w-full h-full'
                            source={{ uri: item.sender.pic }} ></Image>
                        </View>
                      }
                      <View
                        style={{
                          maxWidth: windowWidth / 1.5,
                          marginLeft: isSameSenderMargin(messages, item, index, user._id),
                          marginTop: isSameUser(messages, item, index, user._id) ? 4 : 10
                        }}
                        className={`p-2 rounded-md ${item.sender._id === user._id ? "bg-orangecustom/90" : "bg-graycustom/30"}`}>
                        <Text className={`${item.sender._id === user._id ? "text-white" : "text-black/80"}`}>{item.content}</Text>
                      </View>
                    </View>
                  )))
                }

              </ScrollView>
            </View>
            <View className='absolute bottom-0 w-full bg-white p-[20px]'>
              <View className='flex flex-row w-full items-center'>
                <TextInput
                  value={newMessage}
                  onChangeText={(t) => setNewMessage(t)}
                  className='flex-grow pl-3 mr-3 py-1 rounded-lg bg-graycustom/30'
                  placeholderTextColor='#CFCFCF'
                  placeholder='messs...'></TextInput>
                <TouchableOpacity activeOpacity={0.7}
                  onPress={sendMessage}
                >
                  <Ionicons name='paper-plane' size={24} color='#FF6838' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          : null}
      </Modal>
    </Container>
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
  },
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

export default Chat;