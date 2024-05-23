import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// icon
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
// screen
import home from "./Tab/Home"
import favouritePost from "./Tab/FavouritePost"
import chat from "./Tab/Chat"
import profile from "./Tab/Profile"
import friends from "./Tab/Friends"
import DataProvider from '../context/DataProvider';
const HomeStack = createNativeStackNavigator();
function HomeStackScreen({ route }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ headerShown: false }} name='home' component={home} initialParams={route}></HomeStack.Screen>
      <HomeStack.Screen options={{ headerShown: false }} name='profileOther' component={profile} initialParams={route}></HomeStack.Screen>
    </HomeStack.Navigator>
  )
}
const FavouritePostStack = createNativeStackNavigator();
function FavouritePostStackScreen({ route }) {
  return (
    <FavouritePostStack.Navigator>
      <FavouritePostStack.Screen options={{ headerShown: false }} name='follow' component={favouritePost} initialParams={route}></FavouritePostStack.Screen>
      <HomeStack.Screen options={{ headerShown: false }} name='profileOther' component={profile} initialParams={route}></HomeStack.Screen>
    </FavouritePostStack.Navigator>
  )
}
const FriendsStack = createNativeStackNavigator();
function FriendsStackScreen({ route }) {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen options={{ headerShown: false }} name='follow' component={friends} initialParams={route}></FriendsStack.Screen>
    </FriendsStack.Navigator>
  )
}
const ChatStack = createNativeStackNavigator();
function ChatStackScreen({ route }) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen options={{ headerShown: false }} name='chat' component={chat} initialParams={route}></ChatStack.Screen>
    </ChatStack.Navigator>
  )
}
const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen({ route }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen options={{ headerShown: false }} name='profile' component={profile} initialParams={route}></ProfileStack.Screen>
    </ProfileStack.Navigator>
  )
}
const BottomTabNavigation = ({ route, navigation }) => {
  const Tab = createBottomTabNavigator();
  return (
    <DataProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 54,
            display: true ? null : "none",
            // display: null
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconname;
            if (route.name === 'Home') {
              iconname = focused ? 'ios-home' : 'ios-home-outline';
            }
            else if (route.name === 'Follow') {
              iconname = focused ? 'heart' : 'heart-outline';
            }
            // else if (route.name === 'Friends') {
            //   iconname = focused ? 'people-sharp' : 'people-outline';
            // }
            else if (route.name === 'Chat') {
              iconname = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconname = focused ? 'people' : 'people-outline';
            }
            return <Ionicons name={iconname} size={24} color='#FF6838' />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FF8400',
          tabBarInactiveTintColor: '#120f54',
          //   tabBarLabelStyle: {
          //     fontSize: 14,
          //     fontWeight: "500"
          //   },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Follow" component={FavouritePostStackScreen} />
        {/* <Tab.Screen name="Friends" component={FriendsStackScreen} /> */}
        <Tab.Screen name="Chat" component={ChatStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </DataProvider>
  );
}

const styles = StyleSheet.create({})

export default BottomTabNavigation;
