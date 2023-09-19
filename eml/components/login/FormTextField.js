import React, { useState } from "react";

import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {
  return (
    <View className='mx-10'>
      <View className='flex flex-row'>
        <Text className='ml-2 text-xs'>{props.label ? props.label : ''}</Text>
        <Text className='ml-1 text-xs color-red-600'>{props.required ? '*' : ''}</Text>
      </View>
      <View className=''>
        <TextInput className='h-50 border-solid border-2 br-25 py-1 pl-[10px] border-gray-200 rounded-xl'
          //Phone Number
          placeholder={props.placeholder ? props.placeholder : ""}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        //onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        //value={phoneNumber}
        />
      </View>
      
    </View>

  )
}