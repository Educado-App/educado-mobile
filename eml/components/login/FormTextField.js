import React from "react";
import { isFontsLoaded } from "../../constants/Fonts.js";
import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {
  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <View>
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
          className={
            "h-50 br-25 py-1 pl-[10px] bg-white rounded-lg font-montserrat" +
            (props.bordered ? " border-2 border-gray" : "") +
            (props.error ? " border-2 border-error" : "")
          }
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
          onChangeText={props.onChangeText ? props.onChangeText : null}
          value={props.value}
        />
      </View>
    </View>
  );
}
