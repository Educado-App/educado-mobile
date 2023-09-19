import React, { useState } from "react";

import { Text, View, TextInput } from "react-native";

export default function FormTextField(props) {
  return (
    <View>
      <Text>{props.label ? props.label : 'Label'}</Text>
      <TextInput className='h-50, border-2, border-red-500, mh-20, mv-10, br-25, pl-10'
      //Phone Number
      placeholder={props.placeholder ? props.placeholder : "Placeholder"}
      placeholderTextColor="green"
      keyboardType={"email-address"}
      autoComplete='email'
      name='email'
      //onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      //value={phoneNumber}
    />
    </View>
    
  )
}