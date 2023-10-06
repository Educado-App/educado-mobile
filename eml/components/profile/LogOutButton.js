import { StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

const LOGIN_TOKEN = '@loginToken'
const USER_INFO = '@userInfo'

export default function LogOutButton() {
  const navigation = useNavigation()

  async function logOut() {
    try {
      await AsyncStorage.removeItem(LOGIN_TOKEN).then((r) => {
        console.log('User logged out successfully!')
        navigation.navigate('LoginStack')
      })
    } catch (e) {
      console.log(e)
    }
  }

  const logoutAlert = () =>
    Alert.alert('Logout', 'Are you sure?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: logOut }
    ])

  return (
    <View className="flex items-center px-6 w-screen my-3">
      <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium w-full" onPress={logoutAlert}>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-center font-montserrat-bold text-body text-white">Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}