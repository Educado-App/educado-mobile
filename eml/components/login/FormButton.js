import React, { useState } from "react";

import { Text, View, TextInput, Pressable } from "react-native";

export default function FormButton(props) {
  return (
    <View className='mx-10'>
      <Pressable 
        className='flex-auto items-center bg-[#5ECCE9] px-[40px] py-4 rounded-[8px] opacity-100 active:opacity-70 active:shadow-inner'
        onPress={props.onPress}
      >
        <Text className='text-white text-[16px]'>{props.label}</Text>
      </Pressable>
    </View>

  )
}