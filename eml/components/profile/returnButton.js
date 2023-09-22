import { StyleSheet, View, TouchableOpacity, Alert, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/base'
import { deleteUser, loginUser } from '../../api/userApi'
import {clearAsyncStorage} from "../../services/StorageService";

const LOGIN_TOKEN = '@loginToken'
const USER_INFO = '@userInfo'

export default function ReturnButton() {
  const navigation = useNavigation()

  const handleBackButtonPress = () => {
    console.log('Profile');
    navigation.navigate('Perfil');
  }

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Image
          className = "w-[30] h-[30]"
          source={require("../../assets/images/left_arrow.png")}
        />
      </TouchableOpacity>    
    </View>
  )
}