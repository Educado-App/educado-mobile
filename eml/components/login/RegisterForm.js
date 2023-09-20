import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser, registerUser } from "../../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";

const USER_INFO = '@userInfo';
const LOGIN_TOKEN = '@loginToken';

export default function LoginForm(props) {

  const navigation = useNavigation();

  const [realName, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register(email, password) {

    // clearing input
    setEmail('');
    setPassword('');

    const obj = {
      phone: email,
      password: password
    };

    try {
      await registerUser(obj)
        .then(async function (response) {

          console.log(response);

          try {
            await loginUser(obj)
              .then(function (response) {

                AsyncStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
                console.log(response);
                navigation.navigate('HomeStack');

              })
              .catch(error => {

                switch (error.message) {

                  case "Request failed with status code 404":
                    // Wrong Phone Number
                    console.log("Número de telefone errado!");
                    break;

                  case "Request failed with status code 400":
                    //Wrong Password
                    console.log("Senha incorreta!");
                    break;

                  default:
                    console.log(error);
                }
              });
          }
          catch (e) {
            console.log(e);
          }

          await createProfile(response._id, realName, email);

        })
        .catch(error => {

          console.log(error);
          switch (error.message) {

            case "Request failed with status code 500":
              // Phone Number already exists
              showAlert("Número de telefone já existe!");
              break;

            default: console.log(error);
          }
        });
    }
    catch (e) {
      console.log(e);
    }
  }


  async function createProfile(id, realName, email) {

    try {
      const obj = {
        id: id,
        realName: realName,
        email: email,
      }

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
    }
    catch (e) {
      console.log(e);
    }

  }

  const passwordObj = {
    passwordStrength: password
  };

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
      <View className="mb-6">
        <FormTextField
          label='Nome'
          name={'Name'}
          value={realName}
          //Real name
          placeholder='Nome Sobrenome'
          placeholderTextColor='grey'
          required={true}
          onChangeText={realName => setRealName(realName)}
        />
      </View>
      <View className="mb-6">
        <FormTextField className='mb-6'
          label='Email'
          name={'Email'}
          value={email}
          //Email
          placeholder='user@email.com'
          placeholderTextColor='grey'
          required={true}
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View className="mb-6">
        <FormTextField
          label='Senha'
          name={'password'}
          value={password}
          //Password
          placeholder='******'
          placeholderTextColor='grey'
          secureTextEntry={true}
          required={true}
          passwordGuidelines={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      {/* TODO: compare password with confirm password and give error if not same.*/}
      <View className="mb-6">
        <FormTextField
          label='Confirmar Senha'
          name={'Confirm password'}
          value={password}
          //Confirm password
          placeholder='******'
          placeholderTextColor='grey'
          secureTextEntry={true}
          required={true}
        />
      </View>
      <View className='my-10'>
        <FormButton
          onPress={() => register(email, password)}
          label='Cadastrar'
        />
      </View>
    </View>
  );
}