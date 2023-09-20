import React, { useState } from "react";

import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {

  const displayPasswordGuidelines = (props) => {
    if (props.passwordGuidelines) {
      return (
        <View className='flex flex-column mb-1'>
          <Text className='ml-3 text-xs text-gray'>• Mínimo 8 caracteres</Text>
          <Text className='ml-3 text-xs text-gray'>• Conter pelo menos uma letra</Text>
        </View>
      )
    }
  }


  return (
    <View className='mx-6 pb-2'>
      <View className='flex flex-row'>
        <Text className='text-xs font-light pb-1 pt-2'>{props.label ? props.label : ''}</Text>
        <Text className='ml-1 font-normal text-xs text-error pb-1 pt-2'>{props.required ? '*' : ''}</Text>
      </View>
      <View className=''>
        <TextInput className='bg-white h-50 py-2 pl-[10px] border-gray-200 rounded-md'
          //Phone Number
          placeholder={props.placeholder ? props.placeholder : ""}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
          passwordGuidelines={props.passwordGuidelines ? props.passwordGuidelines : false}
        //onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        //value={phoneNumber}
        />
      </View>
      {displayPasswordGuidelines(props)}
    </View>

  )
}