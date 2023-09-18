import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import AddFriendButton from '../../components/profile/addFriendButton'
import ProfileImage from '../../components/profile/profileImage'
import ProfileName from '../../components/profile/profileName'
import LogOutButton from '../../components/profile/LogOutButton'
import DeleteAccount from '../../components/profile/deleteAccount'
import SettingsButton from '../../components/profile/settingsButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const USER_INFO = '@userInfo'

export default function ProfileComponent() {
  const [id, setId] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigation = useNavigation()

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO))

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id)
        setUserName(fetchedProfile.userName)
        setPhoneNumber(fetchedProfile.phoneNumber)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
  
  return (
    <SafeAreaView className="bg-babyBlue">
      <ScrollView>
        <View className="flex-1 flex-col justify-center h-screen">
          <ProfileName Name={userName} PhoneNumber={phoneNumber}></ProfileName>
          <SettingsButton></SettingsButton>
          <LogOutButton></LogOutButton>
          <DeleteAccount></DeleteAccount>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center', // Center the content horizontally
    backgroundColor: '#E4F2F5', // Add this line to set the background color
  }
})

