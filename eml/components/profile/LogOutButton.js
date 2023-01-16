import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/base'

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
    <View className="pb-6">
      <TouchableOpacity style={styles.formButton} onPress={logoutAlert}>
        <View className="flex flex-row items-center justify-center">
          <View>
            <Feather
              color="#9DE89C"
              name="log-out"
              size={36}
              style={styles.tinyLogo}
            />
          </View>
          <View>
            {/* Log out */}
            <Text style={styles.text}>Sair</Text>
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
