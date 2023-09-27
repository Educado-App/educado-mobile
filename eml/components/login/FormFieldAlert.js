import { React } from 'react';
import { Text, View } from 'react-native';

export default function FormFieldAlert(props) {
  return (
    <View className="flex-row items-center">
      <Text className="text-xs text-error mx-2 font-montserrat">
        {/* Passwords must match */}
        {props.label}
      </Text>
    </View>
  )
}