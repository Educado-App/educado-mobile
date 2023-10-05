import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.formButton} onPress={deleteAlert}>
        <View className="flex flex-row items-center justify-center">
          <View>
            <Feather
              color="#9DE89C"
              name="delete"
              size={36}
              style={styles.tinyLogo}
            />
          </View>
          <View>
            {/* Delete Account */}
            <Text style={styles.text}>Deletar conta</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: 'hsl(0, 0%, 92%)',
    height: 55,
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
    elevation: 5
  },
  text: {
    fontSize: 30,
    color: '#9DE89C'
  },
  tinyLogo: {
    flex: 1,
    alignItems: 'center',
    width: 50,
    height: 50
  }
})
