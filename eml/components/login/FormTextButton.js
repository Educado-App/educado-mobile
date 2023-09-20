import React, { useState } from "react";

import { Text, View, TextInput, Pressable } from "react-native";

export default function FormTextButton(props) {
  return (
    <View className='mx-6'>
      <Pressable 
        className='flex-auto items-right py-1'
        onPress={props.onPress}
      >
        <Text className='text-black font-light text-right underline underline-offset-2 text-[16px]'>{props.label}</Text>
      </Pressable>
    </View>
  )
}