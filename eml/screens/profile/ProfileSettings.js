import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  ScrollView
} from 'react-native'
import AddFriendButton from '../../components/profile/addFriendButton'
import ProfileImage from '../../components/profile/profileImage'
import ProfileName from '../../components/profile/profileName'
import ProfileSettings from '../../components/profile/profileSettings'
import LogOutButton from '../../components/profile/LogOutButton'
import DeleteAccount from '../../components/profile/deleteAccount'
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO = '@userInfo'

export default function ProfileComponent() {
  const [id, setId] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

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
          <ProfileSettings></ProfileSettings>
          <LogOutButton></LogOutButton>
          <DeleteAccount></DeleteAccount>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  settings: {
    textAlign: 'right'
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  }
})
