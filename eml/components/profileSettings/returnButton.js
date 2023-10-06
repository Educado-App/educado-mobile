import { View, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';

const LOGIN_TOKEN = '@loginToken'
const USER_INFO = '@userInfo'

export default function ReturnButton() {
  const navigation = useNavigation()
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  const handleBackButtonPress = () => {
    navigation.navigate('Perfil');
  }

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Svg className="w-[30] h-[30] right-20">
          <Path
            d="M15.41 17.1239L10.83 12.5439L15.41 7.95385L14 6.54385L8 12.5439L14 18.5439L15.41 17.1239Z"
            fill={projectColors.projectBlack}
          />
        </Svg>
      </TouchableOpacity>    
    </View>
  )
}