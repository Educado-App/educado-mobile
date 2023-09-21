import React, { useState } from "react";
import { isFontsLoaded } from "../../constants/Fonts.js";
import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {
  if (!isFontsLoaded()) {
    return null;
  }

  const displayPasswordGuidelines = (props) => {
    if (props.passwordGuidelines) {
      return (
        <View className="flex flex-column">
          <Text className="ml-3 text-xs text-gray my-1 font-montserrat">
            • Mínimo 8 caracteres
          </Text>
          <Text className="ml-3 text-xs text-gray font-montserrat">
            • Conter pelo menos uma letra
          </Text>
        </View>
      );
    }
  };

  return (
    <View className="mx-10">
      <View className="flex flex-row">
        <Text className="ml-2 text-xs font-montserrat">
          {props.label ? props.label : ""}
        </Text>
        <Text className="ml-1 text-xs text-error font-montserrat">
          {props.required ? "*" : ""}
        </Text>
      </View>
      <View className="">
        <TextInput
          className="bg-white h-50 br-25 py-1 pl-[10px] border-gray-200 rounded-xl font-montserrat"
          //Phone Number
          placeholder={props.placeholder ? props.placeholder : ""}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          passwordGuidelines={
            props.passwordGuidelines ? props.passwordGuidelines : false
          }
          //onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          //value={phoneNumber}
        />
      </View>
      {displayPasswordGuidelines(props)}
    </View>
  );
}
