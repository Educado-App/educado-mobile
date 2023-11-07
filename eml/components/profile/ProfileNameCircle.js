import React from 'react'
import { View } from 'react-native'
import Text from '../general/Text';

/**
 * Component for showing an alert below a form field
 * @param {Object} props should contain the following properties:
 * - firstName: String
 * - lastName: String
 * @returns {React.Element} JSX element for showing alerts
 */
export default function ProfileNameCircle(props) {
  return (
    <View className="grid rounded-full bg-profileCircle h-24 w-24 aspect-square items-center justify-center">
      <Text className="text-projectWhite text-5xl font-bold text-center bg-white mt-2"> 
        {props.firstName.charAt(0).toUpperCase()} {props.lastName.charAt(0).toUpperCase()}
      </Text>
    </View>
  )
}