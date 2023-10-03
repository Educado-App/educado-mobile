import {
  View,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'; // Import the Text component

const USER_INFO = '@userInfo'

export default function settingsButton() {

  const navigation = useNavigation()

  const handleGearIconPress = () => {
    navigation.navigate('ProfileSettings');
  };
  
  return (
    <View className="flex items-center px-6 w-screen my-3">
      <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium w-full" onPress={handleGearIconPress}>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-center font-montserrat-bold text-body text-white">Configurações</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}