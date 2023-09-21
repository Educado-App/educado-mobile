import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/base'
import { deleteUser, loginUser } from '../../api/userApi'
import {clearAsyncStorage} from "../../services/StorageService";
import { styles } from './styles'; // Import the styles from styles.js

const LOGIN_TOKEN = '@loginToken'
const USER_INFO = '@userInfo'

export default function DeleteAccount() {
  const navigation = useNavigation()

  async function Delete() {
    try {
      const obj = JSON.parse(await AsyncStorage.getItem(USER_INFO));
  
      if (obj !== null) {
        try {
          // Delete the user using async/await
          const response = await deleteUser(obj.id); // The deleteUser() doesn't have an endpoint API yet
          console.log(response);
  
          // Remove items from AsyncStorage using async/await
          await AsyncStorage.multiRemove([LOGIN_TOKEN, USER_INFO]);
  
          console.log('User account deleted successfully!');
          navigation.navigate('LoginStack');
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    } catch (e) {
      console.error('Error reading AsyncStorage:', e);
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