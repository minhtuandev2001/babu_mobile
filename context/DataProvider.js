import React from 'react';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [fetchAgain, setsetFetchAgain] = useState(false)
  const [chats, setChats] = useState([])
  const [fetchDataUserAgain, setFetchDataUserAgain] = useState(false)
  const handleFetch = () => {
    setFetchDataUserAgain(!fetchDataUserAgain)
  }
  const value = { user, setUser, fetchAgain, setsetFetchAgain, chats, setChats, handleFetch }
  useEffect(() => {
    async function fetchDataUser() {
      try {
        const jsonValue = await AsyncStorage.getItem('userInfo');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        console.log(e)
      }
    }
    fetchDataUser()
    return () => { }
  }, [fetchDataUserAgain])

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
export const DataState = () => {
  return useContext(DataContext);
};

export default DataProvider;
