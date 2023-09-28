import React from "react";
import { isFontsLoaded } from "../../constants/Fonts.js";
import { Text, View, Pressable } from "react-native";

/**
 * Button component for eg. login and register screens.
 * @param {Object} props Should contain the following properties:
 * - label: String
 * - onPress: Function
 * @returns {React.Element} Button component
 */
export default function FormButton(props) {
  
  // Checking if font is loaded
  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <View className='mt-12'>
      <Pressable 
        className={'flex-auto items-center bg-primary px-[40px] py-4 rounded-[8px] opacity-100 active:opacity-70 active:shadow-inner' +
          (props.disabled ? ' opacity-50 bg-gray' : '')}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text className='text-white text-[16px] font-bold'>{props.label}</Text>
      </Pressable>
    </View>
  )
}
