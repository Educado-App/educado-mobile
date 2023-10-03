import { View, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
          className = "w-[30] h-[30] right-20"
          source={require("../../assets/images/left_arrow.png")}
        />
      </TouchableOpacity>    
    </View>
  )
}