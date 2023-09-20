import React, { useState } from 'react';
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormTextField from "./FormTextField";
import FormButton from './FormButton';

const LOGIN_TOKEN = '@loginToken';
const USER_INFO = '@userInfo';

//When Logout: back button should be disabled!!!!

export default function LoginForm(props) {

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  async function login(phoneNumber, password) {

    //clearing input
    setPhoneNumber('');
    setPassword('');

    //The Object must be hashed before it is sent to backend (before loginUser() is called)
    //The Input must be conditioned (at least one capital letter, minimum 8 letters and a number etc.)
    const obj = {
      phone: phoneNumber,
      password: password
    };

    try {
      await loginUser(obj)
        .then((response) => {
          AsyncStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
          console.log(response);
          navigation.navigate('HomeStack');
        })
        .catch(error => {

          switch (error.message) {

            case "Request failed with status code 404":
              //Wrong Phone Number
              showAlert("Número de telefone errado!")
              break;

            case "Request failed with status code 400":
              //Wrong Password
              showAlert("Senha incorreta!")
              break;

            default: console.log(error);
          }
        });
    }
    catch (e) {
      console.log(e);
    }

  }

  const showAlert = (error) =>
    Alert.alert(
      error,
      //Try again
      "Tente novamente",
      [
        {
          //OK
          text: "Certo",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View>
      <FormTextField
        placeholder='user@email.com'
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        label='Email'
        required={true}
      />
      <FormTextField
        placeholder='Senha'
        onChangeText={password => setPassword(password)}
        label='Senha'
        required={true}
        secureTextEntry={true}
      />
      <FormButton label='Connect-se' />
    </View>
  );
}
