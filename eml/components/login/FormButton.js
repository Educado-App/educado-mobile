import React, { useState } from "react";

import { Text, View, TextInput, Pressable } from "react-native";

export default function FormButton(props) {
  return (
    <View className={`mx-6 pt-${props.paddingTop}`}>
      <Pressable 
        className='flex-auto items-center bg-[#5ECCE9] py-4 rounded-[8px] opacity-40 active:opacity-100 active:shadow-inner'
        onPress={props.onPress}
      >
        <Text className='text-white font-bold text-[16px]'>{props.label}</Text>
      </Pressable>
    </View>

  )
}