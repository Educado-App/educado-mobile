import React, { useEffect, useState } from 'react'
import {
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
import SettingsButton from '../../components/profile/settingsButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { isFontsLoaded } from "../../constants/Fonts.js";
import { BgLinearGradient } from "../../constants/BgLinearGradient";

const USER_INFO = '@userInfo'

export default function ProfileComponent() {
  const [id, setId] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO))

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id)
        setUserName(fetchedProfile.userName)
        setEmail(fetchedProfile.email)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (!isFontsLoaded()) {
    return null;
  }
  
  return (
    <BgLinearGradient>
      <SafeAreaView>
        <ScrollView>
          <View className="flex-1 flex-col justify-center h-screen">
            <ProfileName Name={userName} Email={email}></ProfileName>
            <SettingsButton></SettingsButton>
            <LogOutButton></LogOutButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BgLinearGradient>
  )
}