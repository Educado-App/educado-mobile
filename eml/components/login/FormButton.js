import React, { useState } from "react";

import { Text, View, Pressable } from "react-native";

export default function FormButton(props) {
  return (
    <View className='mt-12'>
      <Pressable 
        className='flex-auto items-center bg-primary px-[40px] py-4 rounded-[8px] opacity-100 active:opacity-70 active:shadow-inner'
        onPress={props.onPress}
      >
        <Text className='text-white text-[16px] font-bold'>{props.label}</Text>
      </Pressable>
    </View>

  )
}
