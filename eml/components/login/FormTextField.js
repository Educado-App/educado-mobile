import React from "react";
import { isFontsLoaded } from "../../constants/Fonts.js";
import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {

  if (!isFontsLoaded()) {
    return null;
  }

  const displayPasswordGuidelines = (props) => {
    if (props.passwordGuidelines) {
      return (
        <View className='flex flex-column'>
          <Text className='ml-3 text-xs text-gray my-1 font-montserrat'>• Mínimo 8 caracteres</Text>
          <Text className='ml-3 text-xs text-gray font-montserrat'>• Conter pelo menos uma letra</Text>
        </View>
      )
    }
  }

  return (
    <View className='my-2'>
      <View className='flex flex-row'>
        <Text className='ml-2 text-xs font-montserrat'>{props.label ? props.label : ''}</Text>
        <Text className='ml-1 text-xs color-red-600 font-montserrat'>{props.required ? '*' : ''}</Text>
      </View>
      <View className=''>
        <TextInput className={'h-50 br-25 py-1 pl-[10px] bg-white rounded-lg font-montserrat' + (props.bordered ? ' border-2 border-gray' : '') + (props.error ? ' border-2 border-error' : '')}
          //Phone Number
          placeholder={props.placeholder ? props.placeholder : ""}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
          passwordGuidelines={props.passwordGuidelines ? props.passwordGuidelines : false}
          onChangeText={props.onChangeText ? value => props.onChangeText(value) : null}
          value={props.value}
        />
      </View>
      {displayPasswordGuidelines(props)}
    </View>

  )
}
