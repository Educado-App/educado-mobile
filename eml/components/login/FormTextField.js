import React, { useState } from "react";

import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {
  return (
    <View className='mx-6'>
      <View className='flex flex-row'>
        <Text className='text-xs font-light pb-1 pt-2'>{props.label ? props.label : ''}</Text>
        <Text className='ml-1 font-normal text-xs text-error pb-1 pt-2'>{props.required ? '*' : ''}</Text>
      </View>
      <View className=''>
        <TextInput className='h-50 py-2 pl-[10px] bg-white rounded-md'
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