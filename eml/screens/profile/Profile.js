import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import ProfileName from '../../components/profile/profileName'
import LogOutButton from '../../components/profile/LogOutButton'
import SettingsButton from '../../components/profile/settingsButton.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BgLinearGradient } from "../../constants/BgLinearGradient";

const USER_INFO = '@userInfo'

export default function ProfileComponent() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO))

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id)
        setName(fetchedProfile.name)
        setEmail(fetchedProfile.email)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
  
  return (
    <BgLinearGradient>
      <SafeAreaView>
        <ScrollView>
          <View className="flex-1 flex-col justify-center h-screen">
            <ProfileName Name={`${name}`}></ProfileName>
            <SettingsButton></SettingsButton>
            <LogOutButton testID='logoutBtn'></LogOutButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BgLinearGradient>
  )
}