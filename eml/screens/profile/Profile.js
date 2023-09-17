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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

import { Text } from 'react-native'; // Import the Text component

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

  const handleGearIconPress = () => {
    console.log('Settings');
    navigation.navigate('ProfileSettings');
  };
  
  return (
    <SafeAreaView className="bg-babyBlue">
      <ScrollView>
        <View className="flex-1 flex-col justify-center h-screen">
          <ProfileName Name={userName} PhoneNumber={phoneNumber}></ProfileName>
          {/* Gear Icon */}
          <TouchableOpacity style={styles.formButton} onPress={handleGearIconPress}>
              <View className="flex flex-row items-center justify-center">
                <View>
                  <Icon
                    size={36}
                    name="cog"
                    type="material-community"
                    color="#9DE89C"
                    style={styles.tinyLogo}
                  />
                </View>
                <View>
                  {/* Settings */}
                  <Text style={styles.text}>Configurações</Text>
                </View>
              </View>
          </TouchableOpacity>
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
  },
  formButton: {
    backgroundColor: 'hsl(0, 0%, 92%)',
    height: 55,
    width: '100%', // Change the width to '100%' to make it stretch across the screen
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 92%)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20, // Add some space between buttons
  },
  text: {
    fontSize: 30, // Adjust the font size to your preference
    color: '#9DE89C',
    textAlign: 'center', // Center the text horizontally
  },
  tinyLogo: {
    width: 36, // Adjust the size of the icon
    height: 36, // Adjust the size of the icon
    marginRight: 10, // Add space between the icon and text
  }
})

