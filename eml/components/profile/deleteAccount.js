import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/base'
import { deleteUser, loginUser } from '../../api/userApi'
import {clearAsyncStorage} from "../../services/StorageService";

const LOGIN_TOKEN = '@loginToken'
const USER_INFO = '@userInfo'

export default function DeleteAccount() {
  const navigation = useNavigation()

  async function Delete() {
    try {
      const obj = JSON.parse(await AsyncStorage.getItem(USER_INFO))

      if (obj !== null) {
        try {
          await deleteUser(obj.id)
            .then(function (response) {
              console.log(response)
              AsyncStorage.multiRemove([LOGIN_TOKEN, USER_INFO]).then((r) => {
                console.log('User account deleted successfully!')
                navigation.navigate('LoginStack')
              })
            })
            .catch((error) => {
              console.log(error)
            })
          await clearAsyncStorage();
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAlert = () =>
    Alert.alert('Delete Account', 'Are you sure?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: Delete }
    ])

  return (
    <View className="flex items-center px-6 w-screen my-3">
      <TouchableOpacity className="bg-red px-10 py-4 rounded-medium w-full" onPress={deleteAlert}>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-center font-montserrat-bold text-body text-white">Deletar conta</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}